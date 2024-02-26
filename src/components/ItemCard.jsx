import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export const ItemCard = ({ item, columns }) => {
    return (
      <Card sx={{ margin: 2 }}>
        <CardContent>
          {columns.map((column) => (
            <Box key={column.field} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ marginRight: 1, fontWeight: 'bold' }}>
                {column.headerName}:
              </Typography>
              <Typography variant="body2">
                {item[column.field]}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  };