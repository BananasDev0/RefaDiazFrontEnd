import { useCallback, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { File as AppFile } from '../../../types/common.types';
import type { VehicleNoteFormData } from '../../../types/vehicleNote.types';
import { getPublicStorageUrl } from '../../../utils/storage';
import { ImageDropzone } from '../../Products/forms/ImageDropZone';
import { ImageViewer } from '../../Products/forms/ImageViewer';

interface VehicleNoteImageManagerProps {
  isReadOnly?: boolean;
}

const VEHICLE_NOTE_IMAGE_FILE_TYPE_ID = 3;

const VehicleNoteImageManager = ({
  isReadOnly = false,
}: VehicleNoteImageManagerProps) => {
  const { control } = useFormContext<VehicleNoteFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextPreviews: Record<string, string> = {};
    const urlsToRevoke: string[] = [];

    fields.forEach((field) => {
      const file = field as unknown as AppFile;

      if (file.nativeFile) {
        const blobUrl = URL.createObjectURL(file.nativeFile);
        nextPreviews[field.id] = blobUrl;
        urlsToRevoke.push(blobUrl);
      } else if (file.storagePath) {
        nextPreviews[field.id] = getPublicStorageUrl(file.storagePath);
      }
    });

    setImagePreviews(nextPreviews);

    return () => {
      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fields]);

  const handleFilesAdded = useCallback((files: File[]) => {
    const filesToAppend = files.map((file, index) => ({
      name: file.name,
      mimeType: file.type,
      nativeFile: file,
      storagePath: '',
      orderId: fields.length + index + 1,
      fileTypeId: VEHICLE_NOTE_IMAGE_FILE_TYPE_ID,
    }));

    append(filesToAppend);
  }, [append, fields.length]);

  const dropzone = (
    <ImageDropzone
      onFilesAdded={handleFilesAdded}
      disabled={isReadOnly}
    />
  );

  return (
    <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff' }}>
      <ImageViewer
        images={fields as never[]}
        previews={imagePreviews}
        onDelete={remove}
        isReadOnly={isReadOnly}
        dropzoneSlot={!isReadOnly ? dropzone : undefined}
      />
    </Paper>
  );
};

export default VehicleNoteImageManager;
