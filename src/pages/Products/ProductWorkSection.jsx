import { useState } from 'react';
import { Box, TextField, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemsCardList from '../../components/ItemCardList';

function ProductWorkSection({ rows: allRows, columns, onAddClick }) {
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(allRows);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setRows(allRows);
    else {
      const filteredRows = allRows.filter((row) =>
        Object.keys(row).some((key) =>
          row[key].toString().toLowerCase().includes(lowercasedValue)
        )
      );
      setRows(filteredRows);
    }
  };


  const renderMobileView = () => (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 300px)', // Ajusta según el contenido adicional de tu página
        overflowY: 'auto' // Esto habilitará el desplazamiento vertical
      }}
    >
      <ItemsCardList rows={rows} columns={columns} />
    </Box>
  );


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TextField
        placeholder="Buscar..."
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ mb: 2, width: '100%' }}
      />
      <Fab
        color="primary"
        aria-label="add"
        onClick={onAddClick}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      {renderMobileView()}
    </Box>
  );
}

export default ProductWorkSection;
