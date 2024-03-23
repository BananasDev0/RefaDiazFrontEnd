
import { Dialog, Button, AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import Slide from '@mui/material/Slide';
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import ProductDialogContent from "./DialogContent";

const Transition = React.forwardRef(function Transition(props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ open, onClose }) => {

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            aria-labelledby="dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Agregar Producto
                    </Typography>
                    <Button autoFocus color="inherit" onClick={onClose}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            <ProductDialogContent/>

        </Dialog>
    );
};

export default ProductDialog;
