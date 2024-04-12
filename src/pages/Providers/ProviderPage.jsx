import { useState } from 'react';
import { Fab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Card, CardContent, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import CustomInput from "../../components/CustomInput";
import ProviderDialog from "./ProviderDialog";
import { useMobile } from "../../components/MobileProvider";

function createData(name, phone, address, comments) {
    return { name, phone, address, comments };
}

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

export default function ProductsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const responsive = useMobile();

    const rows = [
        createData('Pedro Gonzalez', 8123319310, 'los angeles, cdmx', 'proveedor de carritos'),
        createData('Angel Martinez', 1231234128, 'Monterrey, nuevo leon', 'proveedor de mangueras'),
        createData('Lupe Esparza', 1231879832, 'guadalupe, cdmx', 'proveedor de tapas'),
        createData('Jacob Jahir Calvillo Martinez', 91231231, 'San jacinto 702 Fresnos del Lago 66633, Apodaca, Nuevo Leon, Mexico', 'ninguno'),
        createData('Roel Mendoza', 1231231)
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

    const handleCellClick = (row) => {
        setSelectedRow(row);
        if (responsive.isMobile) {
            handleOpenCommentsModal();
        }
    }

    const handleCellDoubleClick = (row) => {
        setSelectedRow(row);
        if (!responsive.isMobile) {
            handleOpenCommentsModal();
        }
    }

    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
            <CustomSearchBar searchTerm={searchTerm} handleSearchChange={(e) => setSearchTerm(e.target.value)} />
            <Box sx={{ height: 'calc(100% - 56px)', overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                {!responsive.isMobile && (
                                    <>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.name} onDoubleClick={() => handleCellDoubleClick(row)}>
                                    <TableCell component="th" scope="row" onClick={() => handleCellClick(row)}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    {!responsive.isMobile && (
                                        <>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell sx={{ display: "flex", gap: "10px" }}>
                                                <Button variant="outlined" onClick={handleOpenCommentsModal} startIcon={<CommentIcon />}>Comentarios</Button>
                                                <IconButton aria-label="delete" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
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