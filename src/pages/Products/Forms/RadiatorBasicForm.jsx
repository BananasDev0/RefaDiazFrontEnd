import { Box, TextField, Grid, Typography } from "@mui/material";
import { modifyAndClone } from "../../../util/generalUtils";
import ImageUpload from "../ProductDialog/ImageUpload";
import { useProductDialogNavigation } from "../ProductDialog/ProductDialogNavigationContext";
import { useProductDialogImage } from "../ProductDialog/ProductDialogImageContext";
import { useProductDialogForm } from "../ProductDialog/ProductDialogFormContext";
import { useEffect } from "react";

export const RadiatorForm = ({ product, handleChange, readOnly }) => {
    return (
        <Box>
            <TextField
                fullWidth
                label="DPI"
                variant="outlined"
                sx={{ mt: 4 }}
                value={product.dpi || ''}
                onChange={(e) => handleChange(e, 'dpi')}
                InputProps={{ readOnly }}
            />

            <TextField
                fullWidth
                label="Unidades disponibles"
                variant="outlined"
                type="number"
                sx={{ mt: 4 }}
                value={product.stockCount || ''}
                onChange={(e) => handleChange(e, 'stockCount')}
                InputProps={{ readOnly }}
            />

            <TextField
                fullWidth
                label="Comentarios"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mt: 4 }}
                value={product.comments || ''}
                onChange={(e) => handleChange(e, 'comments')}
                InputProps={{ readOnly }}
            />
        </Box>
    );
};

const ImageSection = ({ images, onUpload, onDelete }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Imagen del Producto
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 450 }}>
            <ImageUpload 
                onImageDelete={onDelete}
                onImageUpload={onUpload}
                uploadedImages={images.map(file => file.fileData)}
                key={"ProductImage"}
            />
        </Box>
    </Box>
);

const RadiatorBasicForm = () => {
    const { product, setProduct } = useProductDialogForm();
    const { handleImageUpload, handleImageDelete } = useProductDialogImage();
    const { validateCurrentStep } = useProductDialogNavigation();

    useEffect(() => {
        validateCurrentStep();
    }, [product, validateCurrentStep]);

    const handleChange = (event, field) => {
        const updatedProduct = modifyAndClone(product, field, event.target.value);
        setProduct(updatedProduct);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
                <RadiatorForm 
                    product={product}
                    handleChange={handleChange}
                    readOnly={false}
                />
            </Grid>
            <Grid item xs={12} md={5}>
                <ImageSection 
                    images={product.files || []}
                    onUpload={handleImageUpload}
                    onDelete={handleImageDelete}
                />
            </Grid>
        </Grid>
    );
};

export default RadiatorBasicForm;