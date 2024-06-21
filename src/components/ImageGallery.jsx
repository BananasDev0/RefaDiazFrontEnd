import { Box, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const ImageGallery = ({ images, onImageDeleted, readOnly = false }) => {
    const handleDeleteImage = (index) => {
        if (!readOnly) {
            onImageDeleted(index);
        }
    };

    return (
        <Gallery>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {/* Imagen principal */}
                {images.slice(0, 1).map((image, index) => (
                    <Grid item xs={12} key={index} display="flex" justifyContent="center">
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Item
                                original={image}
                                thumbnail={image}
                                width="1024"
                                height="768"
                            >
                                {({ ref, open }) => (
                                    <Box
                                        ref={ref}
                                        onClick={open}
                                        component="img"
                                        src={image}
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            width: 'auto',
                                            height: 'auto',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                            </Item>
                            {!readOnly && (
                                <IconButton
                                    onClick={() => handleDeleteImage(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0, color: 'error.main' }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>
                ))}

                {/* Imágenes secundarias */}
                <Grid item xs={12} container spacing={2} justifyContent="center">
                    {images.slice(1).map((image, index) => (
                        <Grid item key={index}>
                            <Box sx={{ position: 'relative', width: '120px', height: '120px' }}>
                                <Paper elevation={2} sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Item
                                        original={image}
                                        thumbnail={image}
                                        width="1024"
                                        height="768"
                                    >
                                        {({ ref, open }) => (
                                            <Box
                                                ref={ref}
                                                onClick={open}
                                                component="img"
                                                src={image}
                                                sx={{
                                                    width: 'auto',
                                                    height: '100%',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        )}
                                    </Item>
                                    {!readOnly && (
                                        <IconButton
                                            onClick={() => handleDeleteImage(index + 1)}
                                            sx={{ position: 'absolute', top: 0, right: 0, color: 'error.main' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                </Paper>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Gallery>
    );
};

export default ImageGallery;