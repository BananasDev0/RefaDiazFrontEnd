import { useState } from 'react';
import { Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel } from '@mui/material';

const CustomSelectWithAdd = ({
  elements,
  setElements,
  label,
  selectedItem,
  setSelectedItem,
  onItemAdded,
  dialogFields
}) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectChange = (event) => {
    const selected = elements.find(item => item.id === event.target.value);
    if (selected) {
      setSelectedItem(selected);
    }
  };

  const handleAddNewItem = async () => {
    const newItemWithoutId = { ...formValues };
  
    if (onItemAdded) {
      const newItemId = await onItemAdded(elements, newItemWithoutId);
      const newItemWithId = { id: newItemId, ...newItemWithoutId };
      const newElements = [...elements, newItemWithId];
      setElements(newElements);
      setSelectedItem(newItemWithId);
    } else {
      console.error('onItemAdded is not defined');
    }
  
    setFormValues({});
    handleClose();
  };
  

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
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
        {elements.map((item, index) => (
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
          {dialogFields.map((field) => (
            <TextField
              key={field.name}
              autoFocus
              name={field.name}
              margin="dense"
              id={field.name}
              label={field.label || field.name}
              type={field.type || 'text'}
              fullWidth
              variant="standard"
              value={formValues[field.name] || ''}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddNewItem}>Añadir</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
};

CustomSelectWithAdd.defaultProps = {
  initialItems: [],
  label: 'Elige o añade una opción',
  placeholder: 'Nuevo Elemento',
  dialogFields: []
};

export default CustomSelectWithAdd;


