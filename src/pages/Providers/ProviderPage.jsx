import { useState, useEffect } from 'react';
import {
    Tooltip, Fab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Card, CardContent, Typography, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import CustomInput from "../../components/CustomInput";
import ProviderDialog from "./ProviderDialog";
import { useMobile } from "../../components/MobileProvider";
import { getAll, deleteProvider, createProvider, updateProvider } from '../../services/ProviderService';
import TablePagination from '@mui/material/TablePagination';

import { useSnackbar } from '../../components/SnackbarContext';

const CustomSearchBar = ({ searchTerm, handleSearchChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
                <CustomInput
                    placeholder={'Buscar Proveedor'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
};

export default function ProvidersPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6); // Default rowsPerPage value
    const [totalCount, setTotalCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState([]);
    const [providerId, setProviderId] = useState(null);
    const responsive = useMobile();
    const { openSnackbar } = useSnackbar(); // Usa el hook de Snackbar

    useEffect(() => {
        getProviders();
    }, [page, rowsPerPage]); // Run effect whenever page or rowsPerPage change

    const handleOpenDialog = (e, id) => {
        if (id) {
            setProviderId(id);
        } else {
            setProviderId(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenCommentsModal = (index) => {
        setSelectedRowIndex(index);
        setOpenCommentsModal(true);
    };

    const handleCloseCommentsModal = () => {
        setOpenCommentsModal(false);
    };

    const getProviders = async () => {
        try {
            const response = await getAll(page + 1, rowsPerPage);
            if (response) {
                setRows(response.providers);
                setTotalCount(response.totalCount);
            } else {
                openSnackbar('¡Error en el Servicio! Por favor, inténtalo de nuevo más tarde.', 'error');
            }
        } catch (error) {
            console.error(error);
            openSnackbar('¡Error cargando proveedores!', 'error');
        }
    };


    const updateProviderInfo = async (providerId, updatedData) => {
        try {
            const updated = await updateProvider(providerId, updatedData);
            if (updated) {
                getProviders();
                handleCloseDialog();
                openSnackbar('¡Proveedor actualizado con éxito!', 'info');
            } else {
                openSnackbar('¡Error al actualizar proveedor! Por favor, inténtalo de nuevo más tarde.', 'error');
            }
        } catch (error) {
            openSnackbar('¡Error al actualizar proveedor!', 'error');
        }
    };

    const handleDeleteProvider = async (id) => {
        try {
            const provider = await deleteProvider(id);
            if (provider) {
                getProviders();
                openSnackbar('¡Proveedor eliminado con éxito!', 'info');
            } else {
                openSnackbar('¡Error al eliminar proveedor! Por favor, inténtalo de nuevo más tarde.', 'error');
            }

        } catch (error) {
            openSnackbar('¡Error al eliminar proveedor!', 'error');
        }
    };

    const addProviderToList = async (newProvider) => {
        try {
            await createProvider(newProvider);
            getProviders();
            handleCloseDialog();

            openSnackbar('¡Proveedor agregado con éxito!', 'success');
        } catch (error) {
            console.error(error);
            openSnackbar('¡Error al agregar proveedor!', 'error');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0); // Reinicia la página al cambiar el término de búsqueda
    };


    return (
        <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
            <CustomSearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <Box sx={{ height: 'calc(100% - 56px)', overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                {responsive.isMobile && (
                                    <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                                )}
                                {!responsive.isMobile && (
                                    <>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())).map((row, index) => (
                                <TableRow key={row.name} >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    {responsive.isMobile && (
                                        <TableCell sx={{ display: "flex", gap: "10px" }}>
                                            <Tooltip title="Comentarios">
                                                <IconButton onClick={() => handleOpenCommentsModal(index)} color='info'>
                                                    <PreviewIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Editar">
                                                <IconButton color='info' onClick={() => handleOpenDialog(row.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Eliminar">
                                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteProvider(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    )}
                                    {!responsive.isMobile && (
                                        <>
                                            <TableCell>{row.phoneNumber}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell sx={{ display: "flex", gap: "10px" }}>
                                                <Tooltip title="Comentarios">
                                                    <IconButton variant="outlined" onClick={() => handleOpenCommentsModal(index)}>
                                                        <PreviewIcon />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Editar">
                                                    <IconButton color='info' onClick={(e) => handleOpenDialog(e, row.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Eliminar">
                                                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteProvider(row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </Box>
                </TableContainer>
            </Box>
            <Modal
                open={openCommentsModal}
                onClose={handleCloseCommentsModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                                Detalles del Proveedor
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Nombre:</strong> {rows[selectedRowIndex] && rows[selectedRowIndex].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Teléfono:</strong> {rows[selectedRowIndex] && rows[selectedRowIndex].phoneNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Dirección:</strong> {rows[selectedRowIndex] && rows[selectedRowIndex].address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Comentarios:</strong> {rows[selectedRowIndex] && rows[selectedRowIndex].comments}
                            </Typography>
                            <Button variant="contained" onClick={handleCloseCommentsModal} style={{ marginTop: 2 }}>Cerrar</Button>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                onClick={handleOpenDialog}
            >
                <AddIcon />
            </Fab>
            <ProviderDialog
                open={openDialog}
                onClose={handleCloseDialog}
                addProviderToList={addProviderToList}
                providerId={providerId}
                updateProviderInfo={updateProviderInfo}
            />
        </Box>
    );
}
