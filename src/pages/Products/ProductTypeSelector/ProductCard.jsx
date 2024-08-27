import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { useProductsContext } from '../ProductsContext';
import { useNavigationContext } from '../../../components/NavigationContext';
import { ProductTypesNamesEsp } from '../ProductsConstants';

const ProductCard = ({ title, description, path, image, productType }) => {
  const navigate = useNavigate();
  const { handleChangeProductType } = useProductsContext();
  const { updateTitle } = useNavigationContext();

  const handleCardClick = () => {
    handleChangeProductType(productType);
    let productName = ProductTypesNamesEsp[productType];
    updateTitle("/home/products", `Productos (${productName})`);
    navigate(path);
  };

  return (
    <Card>
      <CardActionArea onClick={handleCardClick}>
        {image && (
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt={title}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;