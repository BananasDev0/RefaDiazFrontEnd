import { Box, Button, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";
import ProductWorkSection from "./ProductWorkSection";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 150 },
  { field: 'dpi', headerName: 'DPI', width: 130 },
  { field: 'existence', headerName: 'Existencia', width: 130 },
  {
    field: 'actions',
    headerName: 'Acciones',
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const handleEdit = () => {
        // Función para manejar la edición
        console.log(`Editar: ${params.id}`);
      };
      const handleDelete = () => {
        // Función para manejar la eliminación
        console.log(`Eliminar: ${params.id}`);
      };
      const handleView = () => {
        // Función para manejar la visualización
        console.log(`Ver: ${params.id}`);
      };
      return (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleView}
          >
            Ver
          </Button>
        </strong>
      );
    }
  },
];

const rows = [
  { id: 1, name: 'Producto 1', dpi: 'DPI0001', existence: 5 },
  { id: 2, name: 'Producto 2', dpi: 'DPI0002', existence: 3 },
  { id: 3, name: 'Producto 3', dpi: 'DPI0003', existence: 2 },
  { id: 4, name: 'Producto 4', dpi: 'DPI0004', existence: 8 },
  { id: 5, name: 'Producto 5', dpi: 'DPI0005', existence: 0 },
  { id: 6, name: 'Producto 6', dpi: 'DPI0006', existence: 7 },
  { id: 7, name: 'Producto 7', dpi: 'DPI0007', existence: 9 },
  { id: 8, name: 'Producto 8', dpi: 'DPI0008', existence: 4 },
  { id: 9, name: 'Producto 9', dpi: 'DPI0009', existence: 1 },
  { id: 10, name: 'Producto 10', dpi: 'DPI0010', existence: 6 },
];

export default function ProductsPage() {
  const [value, setValue] = useState('one');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 'sm' para dispositivos móviles

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', '& > *:not(style)': { mb: 3 } }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{width: isMobile ? '80vw' : '100%'}}
      >
        <Tab value="one" label="Radiadores" />
        <Tab value="two" label="Tapas" />
        <Tab value="three" label="Ventiladores/Abanicos" />
      </Tabs>
      <ProductWorkSection
        rows={rows}
        columns={columns}
        onAddClick={() => console.log("Agregar nuevo registro")}
      />
    </Box>
  );
}