import {
    Button, Table, TableBody, TableCell, TableHead, TableRow, Box, Typography,
    Tooltip,
    IconButton
} from '@mui/material';
import { useProductDialogContext } from '../ProductDialogContext';
import ExpandableCard from '../../../../components/ExpandableCard';
import Product from '../../../../models/Product';
import { useState } from 'react';
import AddCapModal from './AddCapModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProductTypes } from '../../ProductsConstants';

const CapManagerDisplay = ({
    product,
    openModal,
    handleEditClick,
    handleDelete,
    handleRowClick, // Nueva prop
    readOnly
}) => {
    return (
        <ExpandableCard title="Tapas">
            <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
                {'Agrega y gestiona las tapas de este radiador.'}
            </Typography>
            <Box>
                {!readOnly && (
                    <Box sx={{ mb: 2 }}>
                        <Button
                            onClick={openModal}
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Agregar Tapa
                        </Button>
                    </Box>
                )}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Fotografía</TableCell>
                            {!readOnly && <TableCell align="right">Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.childProducts && product.childProducts.map((cap, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleRowClick(index)} // Abrir modal en modo lectura
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{cap.name}</TableCell>
                                <TableCell align="right">
                                    <img
                                        src={cap.files[0]?.fileData}
                                        alt={cap.name || 'Imagen'}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </TableCell>
                                {!readOnly && (
                                    <TableCell align="right">
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={(e) => { e.stopPropagation(); handleEditClick(e, index); }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton color="error" sx={{ ml: 1 }} onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </ExpandableCard>
    );
};

const CapManager = ({ readOnly = false }) => {
    const { product, handleSetProduct } = useProductDialogContext();
    const [capProduct, setCapProduct] = useState(new Product({}));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReadOnlyModal, setIsReadOnlyModal] = useState(false); // Nuevo estado para determinar el modo del modal
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleOpenModal = (isReadOnly = false) => {
        setIsReadOnlyModal(isReadOnly);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCapProduct(new Product({}));
        setIsReadOnlyModal(false);
    };

    const handleEditClick = (event, index) => {
        setCapProduct(product.childProducts[index]);
        setCurrentIndex(index);
        handleOpenModal(false); // Modo edición
    };

    const handleRowClick = (index) => {
        setCapProduct(product.childProducts[index]);
        setCurrentIndex(index);
        handleOpenModal(true); // Modo lectura
    };

    const handleCapSave = () => {
        if (readOnly) return;
        if (currentIndex !== null) {
            let newProducts = product.childProducts;
            newProducts[currentIndex] = capProduct;
            handleSetProduct({ ...product, childProducts: newProducts });
            setCurrentIndex(null);
        } else {
            capProduct.productTypeId = ProductTypes.CAP;
            handleSetProduct({ ...product, childProducts: [...product.childProducts, capProduct] });
        }
        handleCloseModal();
    };

    const handleDelete = (index) => {
        if (!readOnly) {
            let newProducts = product.childProducts;
            newProducts.splice(index, 1);
            handleSetProduct({ ...product, childProducts: newProducts });
        }
    };

    return (
        <>
            <CapManagerDisplay
                product={product}
                capProduct={capProduct}
                openModal={() => handleOpenModal(false)}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
                handleRowClick={handleRowClick} // Nueva prop para manejar clics en las filas
                readOnly={readOnly}
            />
            <AddCapModal
                open={isModalOpen}
                onClose={handleCloseModal}
                capProduct={capProduct}
                setCapProduct={setCapProduct}
                handleSave={handleCapSave}
                readOnly={isReadOnlyModal} // Modal cambia a modo lectura si es necesario
            />
        </>
    );
};

export { CapManager as default, CapManagerDisplay }
