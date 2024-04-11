import { Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Card, CardContent, Typography } from "@mui/material";
import { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import ProviderDialog from "./ProviderDialog";

function createData(name, phone, address, comments) {
    return { name, phone, address, comments };
}

export default function ProductsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openCommentsModal, setOpenCommentsModal] = useState(false);

    const rows = [
        createData('Pedro Gonzalez', 8123319310, 'los angeles, cdmx', 'proveedor de carritos'),
        createData('Angel Martinez', 1231234128, 'Monterrey, nuevo leon', 'proveedor de mangueras'),
        createData('Lupe Esparza', 1231879832, 'guadalupe, cdmx', 'proveedor de tapas'),
        createData('Jacob Jahir Calvillo Martinez', 91231231, 'San jacinto 702 Fresnos del Lago 66633, Apodaca, Nuevo Leon, Mexico', 'ninguno'),
        createData('Roel Mendoza', 1231231, )
    ];

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenCommentsModal = () => {
        setOpenCommentsModal(true);
    }

    const handleCloseCommentsModal = () => {
        setOpenCommentsModal(false);
    }

    const handleRowClick = (row) => {
        setSelectedRow(row);
    }

    const handleViewComments = () => {
        // Mostrar comentarios del row seleccionado
        if (selectedRow) {
            setOpenCommentsModal(true);
        }
    }

    return (
        <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
            <Box sx={{ height: 'calc(100% - 56px)', overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f0f0f0' }}> 
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell> {/* Nueva columna */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} onClick={() => handleRowClick(row)}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={handleViewComments}>Ver Comentarios</Button> 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                                <strong>Nombre:</strong> {selectedRow && selectedRow.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Teléfono:</strong> {selectedRow && selectedRow.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Dirección:</strong> {selectedRow && selectedRow.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Comentarios:</strong> {selectedRow && selectedRow.comments}
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
            <ProviderDialog open={openDialog} onClose={handleCloseDialog} />
        </Box>
    );
}
