import { Button, Typography } from '@mui/material';
import ExpandableCard from '../../../../components/ExpandableCard';
import { useProviderManager } from './hooks/useProviderManager';
import { ProviderForm } from './components/ProviderForm';
import { ProvidersTable } from './components/ProvidersTable';
import { ProviderDetailModal } from './components/ProviderDetailModal';

const ProviderManager = ({ editable = true }) => {
  const { state, handlers, isAddButtonDisabled } = useProviderManager(editable);

  return (
    <>
      <ExpandableCard title="Proveedores">
        <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
          {state.editable ? 'Añade y gestiona los proveedores del producto.' : ''}
        </Typography>
        
        {state.editable && (
          <>
            <ProviderForm
              providers={state.providers}
              selectedProvider={state.selectedProvider}
              price={state.price}
              numSeries={state.numSeries}
              onProviderChange={handlers.handleProviderChange}
              onPriceChange={handlers.handlePriceChange}
              onNumSeriesChange={handlers.handleNumSeriesChange}
              onProviderCreation={handlers.handleProviderCreation}
              setProviders={handlers.setProviders}
            />
            
            <Button 
              onClick={handlers.handleAddProvider} 
              variant="contained" 
              sx={{ mt: 2 }} 
              disabled={isAddButtonDisabled}
            >
              Agregar Proveedor
            </Button>
          </>
        )}

        <ProvidersTable
          providers={state.product.providers}
          onDelete={handlers.handleDeleteProvider}
          onProviderClick={handlers.handleProviderClick}
          editable={state.editable}
        />
      </ExpandableCard>

      <ProviderDetailModal
        open={state.modalState.isOpen}
        onClose={() => handlers.setModalState({ isOpen: false, provider: null })}
        provider={state.modalState.provider}
      />
    </>
  );
};

export default ProviderManager; 