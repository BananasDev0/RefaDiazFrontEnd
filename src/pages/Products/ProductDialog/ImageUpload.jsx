import { useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageGallery from '../../../components/ImageGallery';

const ImageUpload = ({ onFileSelected }) => {
    const [dragOver, setDragOver] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]); // Estado para almacenar las imágenes cargadas
    const fileInputRef = useRef(null);

    const handleImageDelete = (index) => {
        // Elimina la imagen del estado basado en el índice
        setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleImageSelect = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Cuando la imagen es leída, añádela al estado
            setUploadedImages(prevImages => [...prevImages, reader.result]);
            if (onFileSelected) {
                onFileSelected(file);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            handleImageSelect(files[0]);
        }
    };

    const handleChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleImageSelect(files[0]);
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
                cursor: 'pointer',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChange}
                ref={fileInputRef}
            />
            <ImageGallery images={uploadedImages} onImageDeleted={handleImageDelete}/>
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
            {uploadedImages.length > 0 ? null : <Typography>Arrastra una imagen aquí, o haz clic para seleccionar una.</Typography>}
        </Box>
    );
};

export default ImageUpload;
