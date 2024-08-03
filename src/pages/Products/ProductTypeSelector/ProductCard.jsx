import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ title, description, path, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
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