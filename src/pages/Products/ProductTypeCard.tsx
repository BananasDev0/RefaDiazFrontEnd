import React from 'react';
import { Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductTypeCardProps {
  name: string;
  url: string;
  image: string;
}

const ProductTypeCard: React.FC<ProductTypeCardProps> = ({ name, url, image }) => {
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s',
        '@media (hover: hover)': {
          '&:hover': { transform: 'scale(1.03)' },
        },
      }}
    >
      <CardActionArea component={Link} to={url}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: '100%',
            height: { xs: 96, sm: 140, md: 180, lg: 200 },
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ textAlign: 'center', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, lineHeight: 1.2 }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductTypeCard;
