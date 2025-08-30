import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Card, CardMedia, IconButton, Typography, Grid, Paper } from '@mui/material';
import { AddPhotoAlternate as AddPhotoAlternateIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { File as AppFile } from '../../../types/common.types';
import { supabase } from '../../../services/supabaseClient';

interface ProductImageManagerProps {
  isReadOnly: boolean;
}

const MAX_FILES = 4;

const ProductImageManager: React.FC<ProductImageManagerProps> = ({ isReadOnly }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'files',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const newPreviews: Record<string, string> = {};
    fields.forEach((field) => {
      const file = field as AppFile;
      if (file.nativeFile) {
        newPreviews[field.id] = URL.createObjectURL(file.nativeFile);
      } else if (file.storagePath) {
        const bucketAndPath = file.storagePath.split('/');
        const bucket = bucketAndPath.shift();
        if (bucket) {
          const { data } = supabase.storage.from(bucket).getPublicUrl(bucketAndPath.join('/'));
          newPreviews[field.id] = data.publicUrl;
        }
      }
    });
    setImagePreviews(newPreviews);

    return () => {
      Object.values(newPreviews).forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, [fields]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || isReadOnly) return;

    const filesToAppend = Array.from(files)
      .slice(0, MAX_FILES - fields.length)
      .map((file, index) => ({
        name: file.name,
        mimeType: file.type,
        nativeFile: file,
        storagePath: '',
        orderId: fields.length + index + 1,
        fileTypeId: 1,
      }));

    if (filesToAppend.length > 0) append(filesToAppend);
  }, [append, fields.length, isReadOnly]);

  const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); if (!isReadOnly) setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isReadOnly) handleFiles(e.dataTransfer.files);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (e.target) e.target.value = '';
  };

  const dropzoneStyles = {
    height: 120, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', textAlign: 'center', p: 1,
    borderStyle: 'dashed', borderWidth: 2,
    borderColor: isDragging ? 'primary.main' : 'grey.400',
    backgroundColor: isDragging ? 'action.hover' : 'transparent',
  };

  const renderDropzone = (isBig: boolean = false) => (
    <Grid item xs={12} sm={isBig ? 12 : 4} md={isBig ? 8 : 3}>
      <Paper
        variant="outlined"
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        sx={dropzoneStyles}
      >
        <input type="file" hidden multiple ref={fileInputRef} onChange={onFileChange} accept="image/*" />
        <AddPhotoAlternateIcon sx={{ mb: 1, color: 'grey.600' }} />
        <Typography variant="body2" sx={{ color: 'grey.700' }}>
          Arrastra o da click aquí para subir imágenes
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.500', mt: 0.5 }}>
          ({fields.length}/{MAX_FILES})
        </Typography>
      </Paper>
    </Grid>
  );

  return (
    <Card sx={{ p: 2, mt: 3, backgroundColor: 'background.paper' }}>
      <Grid container spacing={2} justifyContent={fields.length === 0 ? 'center' : 'flex-start'}>
        {fields.map((field, index) => (
          <Grid item key={field.id} xs={4} sm={3} md={3}>
            <Paper sx={{ position: 'relative', overflow: 'hidden', height: 120 }}>
              <CardMedia
                component="img"
                height="120"
                image={imagePreviews[field.id] || ''}
                alt={`Imagen ${index + 1}`}
                sx={{ objectFit: 'contain' }}
              />
              {!isReadOnly && (
                <IconButton
                  aria-label="delete"
                  onClick={() => remove(index)}
                  size="small"
                  sx={{
                    position: 'absolute', top: 4, right: 4, color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </Paper>
          </Grid>
        ))}

        {!isReadOnly && fields.length < MAX_FILES && renderDropzone(fields.length === 0)}
      </Grid>
    </Card>
  );
};

export default ProductImageManager;