import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Tooltip } from '@mui/material';

export const ItemCard = ({ item, columns, onClick }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <Tooltip title={item.name}>
        <CardActionArea onClick={(e) => {
          onClick(e, item)
        }} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {item.imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
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

                  {/*item[column.field]*/}
                  {column.field === 'dpi' ? item[column.field] : ''}
                  {column.field === 'name' ? (item[column.field].length > 20 ? item[column.field].slice(0, 20) + '...' : item[column.field]) : ''}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
};
