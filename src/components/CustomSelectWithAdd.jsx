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
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormValues({});
    setErrors({});
  };

  const handleSelectChange = (event) => {
    const selected = elements.find(item => item.id === event.target.value);
    if (selected) {
      setSelectedItem(selected);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    dialogFields.forEach(field => {
      if (field.required && (!formValues[field.name] || formValues[field.name].trim() === '')) {
        newErrors[field.name] = 'Este campo es obligatorio';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleAddNewItem = async () => {
    if (!validateForm()) {
      return;
    }

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
    setErrors({});
    handleClose();
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
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
              autoFocus={field.name === dialogFields[0].name}
              name={field.name}
              margin="dense"
              id={field.name}
              label={field.label || field.name}
              type={field.type || 'text'}
              fullWidth
              variant="standard"
              value={formValues[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
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


