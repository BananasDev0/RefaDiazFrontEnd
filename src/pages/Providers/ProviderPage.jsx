import { Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState } from 'react';
// import { useMobile } from "../../components/MobileProvider";
import AddIcon from "@mui/icons-material/Add";
import ProviderDialog from "./ProviderDialog";


function createData(name, phone, address, comments) {
    return { name, phone, address, comments };
}

export default function ProductsPage() {
    const [openDialog, setOpenDialog] = useState(false);

    // const responsive = useMobile();
    const rows = [
        createData('Pedro Gonzalez', 8123319310, 'los angeles, cdmx', 'proveedor de carritos'),
        createData('Angel Martinez', 1231234128, 'Monterrey, nuevo leon', 'proveedor de mangueras'),
        createData('Lupe Esparza', 1231879832, 'guadalupe, cdmx', 'proveedor de tapas')
    ];

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <Box sx={{  width: '100%', '& > *:not(style)': { mb: 3 } }}>
            <Box sx={{ height: 'calc(100% - 56px)', overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f0f0f0' }}> 
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Comentarios</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.comments}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
