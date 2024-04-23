import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useProductDialogContext } from "./ProductDialogContext";
import { useProductsContext } from "../ProductsContext";

const ProductDialogToolbar = ({ handleCloseDialog }) => {
    const {
        activeStep,
        handleBack,
        handleNext,
        totalSteps,
        isNextEnabled,
        handleSubmit
    } = useProductDialogContext();
    
    const { productType } = useProductsContext();
    
    return (
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseDialog}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Agregar Producto
                </Typography>
                {activeStep > 0 && (
                    <Button color="inherit" onClick={handleBack}>
                        Atrás
                    </Button>
                )}
                {activeStep < totalSteps - 1 ? (
                    <Button autoFocus color="inherit" onClick={handleNext} disabled={!isNextEnabled}>
                        Siguiente
                    </Button>
                ) : (
                    <Button autoFocus color="inherit" disabled={!isNextEnabled} onClick={ () => handleSubmit(productType)}>
                        Guardar
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default ProductDialogToolbar;

