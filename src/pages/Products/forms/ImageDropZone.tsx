// src/pages/Products/forms/ImageDropzone.tsx

import React, { useState, useCallback, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { AddPhotoAlternate as AddPhotoAlternateIcon } from '@mui/icons-material';

interface ImageDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onFilesAdded, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (files && files.length > 0) onFilesAdded(Array.from(files));
  }, [onFilesAdded]);

  const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); if (!disabled) setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (e.target) e.target.value = '';
  };

  return (
    <Box
      onClick={() => !disabled && fileInputRef.current?.click()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 80, // Asegura una altura mínima
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        border: `2px dashed`,
        borderColor: isDragging ? 'primary.main' : 'grey.300',
        borderRadius: 1,
        bgcolor: isDragging ? 'action.hover' : 'transparent',
        transition: 'border-color 0.3s, background-color 0.3s',
        opacity: disabled ? 0.5 : 1,
        '&:hover': {
          borderColor: disabled ? 'grey.300' : 'primary.light',
        },
      }}
    >
      <input type="file" hidden multiple ref={fileInputRef} onChange={onFileChange} accept="image/*" disabled={disabled} />
      <AddPhotoAlternateIcon sx={{ color: 'grey.500' }} />
      <Typography variant="caption" sx={{ color: 'grey.600', mt: 0.5 }}>
        Añadir
      </Typography>
    </Box>
  );
};