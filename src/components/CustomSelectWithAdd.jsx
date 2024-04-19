import { useState } from 'react';
import { Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel } from '@mui/material';

function CustomSelectWithAdd({ initialItems, label, placeholder, selectedItem, setSelectedItem, onItemAdded }) {
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectChange = (event) => {
    const selected = items.find(item => item.id === event.target.value);
    if (selected) {
      setSelectedItem(selected);
    }
  };

  const handleAddNewItem = () => {
    if (newItemName) {
      const newItem = { id: items.length + 1, name: newItemName };  // Supongamos un ID autoincremental para simplicidad
      const newItems = [...items, newItem];
      setItems(newItems);
      setSelectedItem(newItem);
      setNewItemName('');
      handleClose();
      if (onItemAdded) {
        onItemAdded(newItems, newItem);
      }
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="custom-select-label">{label}</InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        value={selectedItem?.id || ''}
        label={label}
        onChange={handleSelectChange}
        fullWidth
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
        ))}
        <MenuItem style={{ padding: 0 }}>
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
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
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
