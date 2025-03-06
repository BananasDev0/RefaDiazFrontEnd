import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useProductDialogNavigation } from "./ProductDialogNavigationContext";
import { useProductDialogForm } from "./ProductDialogFormContext";
import { useProductSelectionContext } from "../ProductSelectionContext";
import { useProductDialogContext } from "../ProductDialogContext";
import { DIALOG_STEPS } from './DialogSteps';

const ProductDialogToolbar = ({ handleCloseDialog }) => {
    const {
        currentStep,
        previousStep,
        nextStep,
        isNextEnabled,
    } = useProductDialogNavigation();

    const {
        handleSubmit = () => {},
        isEditable,
        setIsEditable
    } = useProductDialogForm();

    const { selectedProduct } = useProductSelectionContext();
    const { openDialog } = useProductDialogContext();

    const renderEditButton = () => (
        <Button
            startIcon={<EditIcon />}
            autoFocus
            color="inherit"
            onClick={() => {
                setIsEditable(true);
                openDialog('edit', selectedProduct.id);
            }}
        >
            Editar
        </Button>
    );

    const renderNavigationButtons = () => (
        <>
            {currentStep !== DIALOG_STEPS.BASIC_INFO && (
                <Button color="inherit" onClick={previousStep}>
                    Atrás
                </Button>
            )}
            {currentStep !== DIALOG_STEPS.SUBMIT ? (
                <Button 
                    autoFocus 
                    color="inherit" 
                    onClick={nextStep} 
                    disabled={!isNextEnabled}
                >
                    Siguiente
                </Button>
            ) : (
                <Button 
                    autoFocus 
                    color="inherit" 
                    disabled={!isNextEnabled} 
                    onClick={handleSubmit}
                >
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
