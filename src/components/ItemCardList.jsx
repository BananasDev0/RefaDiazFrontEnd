import Grid from '@mui/material/Grid';
import { ItemCard } from './ItemCard';
import { Typography, Box } from '@mui/material';

const ItemsCardList = ({ rows, columns, itemCardProps, cardContentMinHeight }) => {
    if (rows.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay elementos disponibles en este momento.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {rows.map((row) => (
                <Grid item xs={12} sm={6} md={3} key={row.id}>
                    <ItemCard item={row} columns={columns} cardContentMinHeight={cardContentMinHeight} {...itemCardProps} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ItemsCardList;