import React, { useState, useEffect } from 'react';
import { Grid, Paper, IconButton, Box } from '@mui/material';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import type { FieldArrayWithId } from 'react-hook-form';
import { Delete } from '@mui/icons-material';

interface ImageViewerProps {
  images: FieldArrayWithId<any, 'files', 'id'>[];
  previews: Record<string, string>;
  onDelete: (index: number) => void;
  isReadOnly: boolean;
  dropzoneSlot?: React.ReactNode;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images, previews, onDelete, isReadOnly, dropzoneSlot }) => {
  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});

  useEffect(() => {
    // Medir las dimensiones de las imágenes que no han sido medidas aún
    Object.entries(previews).forEach(([id, url]) => {
      if (!dimensions[id] && url) {
        const img = new Image();
        img.onload = () => {
          setDimensions(prev => ({ ...prev, [id]: { width: img.naturalWidth, height: img.naturalHeight } }));
        };
        img.src = url;
      }
    });
  }, [previews, dimensions]);

  if (images.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>{dropzoneSlot}</Box>;
  }

  const mainImage = images[0];
  const thumbnails = images.slice(1);

  const mainImageDims = dimensions[mainImage.id] || { width: 1600, height: 1200 };

  return (
    <Gallery>
      <Grid container spacing={1.5}>
        {/* IMAGEN PRINCIPAL */}
        <Grid size={12}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ position: 'relative', overflow: 'hidden', height: { xs: 180, md: 220 }, bgcolor: '#fff' }}
          >
            <Item original={previews[mainImage.id] || ''} width={mainImageDims.width} height={mainImageDims.height}>
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={previews[mainImage.id] || ''}
                  alt="Imagen principal"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                />
              )}
            </Item>
            {!isReadOnly && (
              <IconButton
                onClick={() => onDelete(0)}
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Paper>
        </Grid>

        {/* FILA DE MINIATURAS Y DROPZONE */}
        <Grid size={12}>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'nowrap', overflowX: 'auto', pb: 1 }}>
            {thumbnails.map((thumbnail, index) => {
              const thumbDims = dimensions[thumbnail.id] || { width: 1600, height: 1200 };
              return (
                <Box key={thumbnail.id} sx={{ flexShrink: 0, width: 80, height: 80 }}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', '&:hover .overlay': { opacity: 1 } }}
                  >
                    <Item original={previews[thumbnail.id] || ''} width={thumbDims.width} height={thumbDims.height}>
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={previews[thumbnail.id] || ''}
                          alt={`Miniatura ${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                        />
                      )}
                    </Item>
                    {!isReadOnly && (
                      <IconButton
                        onClick={() => onDelete(index + 1)}
                        size="small"
                        className="overlay"
                        sx={{ position: 'absolute', top: 4, right: 4, color: 'white', bgcolor: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                      >
                        <Delete sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    )}
                  </Paper>
                </Box>
              );
            })}
            {dropzoneSlot &&
              <Box sx={{ flexShrink: 0, width: 80, height: 80 }}>
                {dropzoneSlot}
              </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </Gallery>
  );
};
