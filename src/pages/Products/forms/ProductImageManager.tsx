// src/pages/Products/forms/ProductImageManager.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {  Paper } from '@mui/material';
import { supabase } from '../../../services/supabaseClient';
import { ImageViewer } from './ImageViewer';
import type { File as AppFile } from '../../../types/common.types';
import { ImageDropzone } from './ImageDropZone';

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

  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const newPreviews: Record<string, string> = {};
    const urlsToRevoke: string[] = [];

    fields.forEach((field) => {
      const file = field as AppFile;
      if (file.nativeFile) {
        const blobUrl = URL.createObjectURL(file.nativeFile);
        newPreviews[field.id] = blobUrl;
        urlsToRevoke.push(blobUrl);
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
      urlsToRevoke.forEach(url => URL.revokeObjectURL(url));
    };
  }, [fields]);

  const handleFilesAdded = useCallback((files: File[]) => {
    const filesToAppend = files.map((file, index) => ({
      name: file.name,
      mimeType: file.type,
      nativeFile: file,
      storagePath: '',
      orderId: fields.length + index + 1,
      fileTypeId: 2,
    }));
    append(filesToAppend);
  }, [append, fields.length]);
  
  const dropzone = (
    <ImageDropzone
      onFilesAdded={handleFilesAdded}
      disabled={isReadOnly || fields.length >= MAX_FILES}
      maxFiles={MAX_FILES}
      currentFileCount={fields.length}
    />
  );
  
  return (
    <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff', height: '100%' }}>
      <ImageViewer
        images={fields}
        previews={imagePreviews}
        onDelete={remove}
        isReadOnly={isReadOnly}
        dropzoneSlot={!isReadOnly && fields.length < MAX_FILES ? dropzone : undefined}
      />
    </Paper>
  );
};

export default ProductImageManager;