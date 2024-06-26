import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useProductDialogContext } from "./ProductDialogContext";
import { useProductsContext } from "../ProductsContext";

const ProductDialogToolbar = ({ handleCloseDialog }) => {
    const {
        activeStep,
        handleBack,
        handleNext,
        totalSteps,
        isNextEnabled,
        handleSubmit,
        resetState,
        isEditable,
        setIsEditable
    } = useProductDialogContext();

    const { selectedProduct } = useProductsContext();

    const renderEditButton = () => (
        <Button
            startIcon={<EditIcon />}
            autoFocus
            color="inherit"
            onClick={() => {
                setIsEditable(true);
            }}
        >
            Editar
        </Button>
    );

    const renderNavigationButtons = () => (
        <>
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
                <Button autoFocus color="inherit" disabled={!isNextEnabled} onClick={handleSubmit}>
                    Guardar
                </Button>
            )}
        </>
    );

    return (
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                        handleCloseDialog();
                        resetState();
                    }}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {selectedProduct ? (isEditable ? "Editar Producto" : "Detalles del Producto") : "Agregar Producto"}
                </Typography>
                {!selectedProduct ? renderNavigationButtons() :
                 (selectedProduct && !isEditable) ? renderEditButton() :
                 renderNavigationButtons()}
            </Toolbar>
        </AppBar>
    );
};

export default ProductDialogToolbar;
