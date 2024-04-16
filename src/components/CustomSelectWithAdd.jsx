import { useState } from 'react';
import { Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel } from '@mui/material';

function CustomSelectWithAdd({ initialItems, label, placeholder, selectedItem, setSelectedItem, onItemAdded }) {
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleAddNewItem = () => {
    const newItems = [...items, newItem];
    setItems(newItems);
    setSelectedItem(newItem);
    setNewItem('');
    handleClose();
    if (onItemAdded) {
      onItemAdded(newItems, newItem);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="custom-select-label">{label}</InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        value={selectedItem}
        label={label}
        onChange={handleSelectChange}
        fullWidth
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
        <MenuItem value="" style={{ padding: 0 }}>
          <Button 
            fullWidth 
            color="primary" 
            onClick={handleOpen}
            sx={{ justifyContent: 'flex-start', width: '100%' }}
          >
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
            id="new-item-name"
            label={placeholder || 'Nuevo Elemento'}
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

CustomSelectWithAdd.defaultProps = {
  initialItems: [],
  label: 'Elige o añade una opción',
  placeholder: 'Nuevo Elemento'
};

export default CustomSelectWithAdd;
