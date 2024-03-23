import { Box, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageGallery = ({ images, onImageDeleted }) => {
    const handleDeleteImage = (index) => {
      // Llama a la prop `onImageDeleted` con el índice de la imagen a eliminar
      onImageDeleted(index);
    };
  
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Imagen principal */}
        {images.slice(0, 1).map((image, index) => (
          <Grid item xs={12} key={index} display="flex" justifyContent="center">
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Box
                component="img"
                src={image}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '4px',
                }}
              />
              <IconButton
                onClick={() => handleDeleteImage(index)}
                sx={{ position: 'absolute', top: 0, right: 0, color: 'error.main' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
  
        {/* Imágenes secundarias */}
        <Grid item xs={12} container spacing={2} justifyContent="center">
          {images.slice(1).map((image, index) => (
            <Grid item key={index}>
              <Box sx={{ position: 'relative', width: '120px', height: '120px' }}>
                <Paper elevation={2} sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: 'auto',
                      height: '100%',
                      borderRadius: '4px',
                    }}
                  />
                </Paper>
                <IconButton
                  onClick={() => handleDeleteImage(index + 1)} // +1 para ajustar el índice correctamente
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'error.main' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
};

export default ImageGallery;
