import Grid from '@mui/material/Grid';
import { ItemCard } from './ItemCard'; // Assuming ItemCard is in the same directory

const ItemsCardList = ({ rows, columns }) => {
    return (
        <Grid container spacing={2}>
            {rows.map((row) => (
                <Grid item xs={12} sm={6} md={4} key={row.id}>
                    <ItemCard item={row} columns={columns} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ItemsCardList;
