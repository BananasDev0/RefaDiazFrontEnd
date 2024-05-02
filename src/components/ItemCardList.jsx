import Grid from '@mui/material/Grid';
import {ItemCard} from './ItemCard'; // Assuming ItemCard is in the same directory

const ItemsCardList = ({ rows, columns, itemCardProps}) => {
    return (
        <Grid container spacing={2}>
            {rows.map((row) => (
                <Grid item xs={12} sm={6} md={3} key={row.id}>
                    <ItemCard item={row} columns={columns} {...itemCardProps} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ItemsCardList;
