import { Box, Fab, Tab, Tabs} from "@mui/material"
import { useState } from "react";
import { useMobile } from "../../components/MobileProvider";
import ProductSelector from "./ProductSelector";
import AddIcon from '@mui/icons-material/Add';


export default function ProductsPage() {
  const [value, setValue] = useState('one');
  const responsive = useMobile();

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
        sx={{width: responsive.isMobile ? '85vw' : '100%'}}
      >
        <Tab value="one" label="Radiadores" />
        <Tab value="two" label="Tapas" />
        <Tab value="three" label="Ventiladores/Abanicos" />
      </Tabs>
      <Box sx={{
    height: 'calc(100vh - 250px)', // Ajusta 100px según la altura de tus otros componentes como el Toolbar y Tabs
    overflowY: 'auto' // Esto añade desplazamiento vertical si el contenido excede la altura del Box
  }}>
    <ProductSelector />
  </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}