import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { ProductTypes } from './ProductsConstants';
import { useProductsContext } from './ProductsContext';

const productTypeData = [
  {
    type: ProductTypes.RADIATOR,
    title: "Radiadores",
    description: "Para todo tipo de vehículos",
    image: "/src/assets/radiator.jpeg"
  },
  {
    type: ProductTypes.CAP,
    title: "Tapas",
    description: "De radiador y depósito",
    image: "/src/assets/caps.jpeg"
  },
  {
    type: ProductTypes.FAN,
    title: "Abanicos",
    description: "Sistemas de enfriamiento",
    image: "/src/assets/fans.jpeg"
  }
];

const ProductTypeSelector = () => {
  const { handleChangeProductType } = useProductsContext();

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {productTypeData.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.type}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => handleChangeProductType(item.type)} sx={{ flexGrow: 1 }}>
              <CardMedia
                component="img"
                height="250"  // Aumentado para mostrar más de la imagen
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}  // Asegura que la imagen cubra todo el espacio
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