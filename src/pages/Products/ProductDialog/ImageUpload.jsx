import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageGallery from '../../../components/ImageGallery';

const ImageUpload = React.memo(({ uploadedImages, onImageUpload, onImageDelete, readOnly = false }) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (event) => {
        if (!readOnly) {
            event.preventDefault();
            setDragOver(true);
        }
    };

    const handleDragLeave = (event) => {
        if (!readOnly) {
            event.preventDefault();
            setDragOver(false);
        }
    };

    const handleDrop = (event) => {
        if (!readOnly) {
            event.preventDefault();
            setDragOver(false);
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => onImageUpload(file));
            }
        }
    };

    const handleChange = (event) => {
        if (!readOnly) {
            const files = event.target.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => onImageUpload(file));
            }
        }
    };

    return (
        <Box
            sx={{
                border: '1px dashed gray',
                padding: 2,
                marginTop: 2,
                backgroundColor: dragOver ? 'action.hover' : 'background.paper',
                textAlign: 'center',
                cursor: readOnly ? 'default' : 'pointer',
            }}
            onDragOver={readOnly ? null : handleDragOver}
            onDragLeave={readOnly ? null : handleDragLeave}
            onDrop={readOnly ? null : handleDrop}
        >
            {readOnly ? (
                <ImageGallery images={uploadedImages} readOnly />
            ) : (
                <>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleChange}
                        ref={fileInputRef}
                    />
                    <ImageGallery images={uploadedImages} onImageDeleted={onImageDelete} />
                    <label htmlFor="raised-button-file">
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 2, mb: 1 }}
                        >
                            Cargar Imagen
                        </Button>
                    </label>
                </>
            )}
            {uploadedImages.length === 0 && !readOnly && <Typography>Arrastra imágenes aquí, o haz clic para seleccionarlas.</Typography> }
            {uploadedImages.length === 0 && readOnly && <Typography>No hay imagenes cargadas</Typography> }
        </Box>
    );
}, areEqual);

ImageUpload.displayName = 'ImageUpload';

function areEqual(prevProps, nextProps) {
    return prevProps.uploadedImages === nextProps.uploadedImages &&
        prevProps.readOnly === nextProps.readOnly;
}

export default ImageUpload;
