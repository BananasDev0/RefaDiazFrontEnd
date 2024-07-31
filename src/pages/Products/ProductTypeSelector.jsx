import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { ProductTypes } from './ProductsConstants';
import { useProductsContext } from './ProductsContext';
import BrandContainer from './BrandViewer/BrandContainer';
import RadiatorImg from '/src/assets/radiator.jpeg';
import CapsImg from '/src/assets/caps.jpeg';
import FansImg from '/src/assets/fans.jpeg';
import { useEffect } from 'react';

const productTypeData = [
  {
    type: ProductTypes.RADIATOR,
    title: "Radiadores",
    description: "Para todo tipo de vehículos",
    image: RadiatorImg
  },
  {
    type: ProductTypes.CAP,
    title: "Tapas",
    description: "De radiador y depósito",
    image: CapsImg
  },
  {
    type: ProductTypes.FAN,
    title: "Abanicos",
    description: "Sistemas de enfriamiento",
    image: FansImg
  }
];

const ProductTypeSelector = ({ navigate, updateCurrentTitle }) => {
  const { handleChangeProductType } = useProductsContext();

  useEffect(() => {
    updateCurrentTitle('Productos');
  }
    , [updateCurrentTitle]);

  const handleOnProductTypeClick = (type, title) => {
    handleChangeProductType(type);
    updateCurrentTitle(`Productos (${title})`);
    navigate(<BrandContainer />, 'Marcas');
  }

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {productTypeData.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.type}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => handleOnProductTypeClick(item.type, item.title)} sx={{ flexGrow: 1 }}>
              <CardMedia
                component="img"
                height="250"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductTypeSelector;