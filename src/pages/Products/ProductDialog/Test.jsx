import { useState } from 'react';
import { Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel } from '@mui/material';

export default function CustomSelectWithAdd() {
  const [items, setItems] = useState(['Opción 1', 'Opción 2', 'Opción 3']);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [newItem, setNewItem] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleAddNewItem = () => {
    setItems([...items, newItem]);
    setSelectedItem(newItem);
    setNewItem('');
    handleClose();
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Elige o añade una opción</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedItem}
        label="Elige o añade una opción"
        onChange={handleSelectChange}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
        <MenuItem value="">
          <Button color="primary" onClick={handleOpen}>
            Añadir nuevo elemento
          </Button>
        </MenuItem>
      </Select>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir un Nuevo Elemento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nuevo Elemento"
            type="text"
            fullWidth
            variant="standard"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddNewItem}>Añadir</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
