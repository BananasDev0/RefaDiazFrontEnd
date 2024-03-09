import { Box, Tab, Tabs} from "@mui/material"
import { useState } from "react";
import { useMobile } from "../../components/MobileProvider";
import BrandContainer from "./BrandViewer/BrandContainer";


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
      <BrandContainer></BrandContainer>
    </Box>
  );
}