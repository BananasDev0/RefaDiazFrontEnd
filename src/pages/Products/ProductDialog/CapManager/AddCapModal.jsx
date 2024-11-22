import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ImageUpload from '../ImageUpload';
import { FileTypes } from '../../ProductsConstants';
import { v4 } from 'uuid';
import { getMimeType } from '../../../../util/generalUtils';
import File from '../../../../models/File';

const AddCapModal = ({ open, onClose, capProduct, setCapProduct, handleSave, readOnly }) => {

  const handleNameChange = (event) => {
    if (readOnly) return; // Evita cambios en modo lectura
    const { value } = event.target;
    setCapProduct((prev) => ({ ...prev, name: value }));
  };

  const handleImageUpload = (file) => {
    if (readOnly) return; // Evita cambios en modo lectura
    const reader = new FileReader();
    reader.onloadend = () => {
      let orderId = capProduct.files.length + 1;
      let newFile = new File({ fileData: reader.result, orderId, fileTypeId: FileTypes.PRODUCT_IMAGE });
      newFile = getFileInfo(newFile);
      setCapProduct((prev) => ({ ...prev, files: [...prev.files, newFile] }));
    };
    reader.readAsDataURL(file);
  };

  const getFileInfo = (file) => {
    let uuid = v4();
    let filename = `/products/images/${uuid}`;
    return {
      ...file,
      mimeType: getMimeType(file.fileData),
      name: uuid,
      storagePath: filename
    };
  }

  const handleImageDelete = (index) => {
    if (readOnly) return; // Evita cambios en modo lectura
    setCapProduct((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{readOnly ? 'Detalles de la tapa' : 'Agregar nueva tapa'}</DialogTitle>
      <DialogContent>
        {/* Input para el nombre de la tapa */}
        <TextField
          fullWidth
          margin="dense"
          name="name"
          label="Nombre de la tapa"
          value={capProduct.name}
          onChange={handleNameChange}
          InputProps={{ readOnly }} // Desactiva edición en modo lectura
        />

        {/* Componente de carga de imágenes */}
        <ImageUpload
          uploadedImages={capProduct.files.map(file => file.fileData)}
          key={"Cap images"}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          readOnly={readOnly} // Activa modo lectura
        />
      </DialogContent>
      {!readOnly && (
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AddCapModal;