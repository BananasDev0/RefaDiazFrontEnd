import { Button, Typography } from '@mui/material';
import ExpandableCard from '../../../../components/ExpandableCard';
import { usePriceManager } from './hooks/usePriceManager';
import { PriceForm } from './components/PriceForm';
import { PricesTable } from './components/PricesTable';

const PriceManager = ({ readOnly = false }) => {
  const { state, handlers } = usePriceManager();

  return (
    <ExpandableCard title="Precios">
      <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
        {readOnly ? '' : 'Agrega y gestiona los precios.'}
      </Typography>
      
      {!readOnly && (
        <>
          <PriceForm
            price={state.price}
            onPriceChange={handlers.handlePriceChange}
          />
          
          <Button 
            onClick={handlers.handleAddPrice} 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={state.isAddButtonDisabled}
          >
            Agregar Precio
          </Button>
        </>
      )}

      <PricesTable
        prices={state.product.prices}
        onDelete={handlers.handleDeletePrice}
        readOnly={readOnly}
      />
    </ExpandableCard>
  );
};

export default PriceManager; 