import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PriceManager = () => {
    const [prices, setPrices] = useState([]);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');

    const handleAddPrice = () => {
        if (!description || !cost) return; // Simple validation
        setPrices([...prices, { description, cost: Number(cost) }]);
        setDescription('');
        setCost('');
    };

    const handleDeletePrice = (index) => {
        const updatedPrices = prices.filter((_, i) => i !== index);
        setPrices(updatedPrices);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Box sx={{ mb: 2, width: '100%' }}>
                <TextField
                    label="Descripción"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Costo"
                    type="number"
                    variant="outlined"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    fullWidth
                />
                <Button onClick={handleAddPrice} variant="contained" sx={{ mt: 2 }}>
                    Agregar Precio
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="right">Costo</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prices.map((price, index) => (
                        <TableRow key={index}>
                            <TableCell>{price.description}</TableCell>
                            <TableCell align="right">{price.cost}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleDeletePrice(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default PriceManager;
