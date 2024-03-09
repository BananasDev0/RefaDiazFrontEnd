import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export const ItemCard = ({ item, columns }) => {
    console.log(item.imageUrl)
    return (
      <Card sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {item.imageUrl && (
          <CardMedia
            component="img"
            sx={{ width: 160, height: 160, objectFit: 'contain'  }} // Ajusta estas dimensiones según necesites
            image={item.imageUrl}
            alt={`Imagen de ${item.name}`}
          />
        )}
        <CardContent sx={{ width: '100%' }}>
          {columns.map((column) => (
            <Box key={column.field} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
              {column.showLabel !== false && (
                <Typography 
                  sx={{ 
                    marginRight: 1, 
                    fontWeight: 'bold', 
                    fontSize: '12px'
                  }}
                  color="textSecondary"
                >
                  {column.headerName}:
                </Typography>
              )}
              <Typography sx={{ fontSize: '12px', ...(column.valueStyle || {}) }}>
                {item[column.field]}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
};
