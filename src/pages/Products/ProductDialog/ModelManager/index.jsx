import { Button, Typography } from '@mui/material';
import ExpandableCard from '../../../../components/ExpandableCard';
import { useModelManager } from './hooks/useModelManager';
import { ModelForm } from './components/ModelForm';
import { ModelsTable } from './components/ModelsTable';
import { ConflictModal } from './components/ConflictModal';

const ModelManager = ({ readOnly = false }) => {
  const { state, handlers } = useModelManager();

  return (
    <>
      <ExpandableCard 
        title="Modelos"
        defaultExpanded={true}
      >
        <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
          {readOnly ? '' : 'Agrega y gestiona los modelos.'}
        </Typography>
        
        {!readOnly && (
          <>
            <ModelForm
              brand={state.selectedBrand}
              brands={state.brands}
              models={state.models}
              setModels={handlers.setModels}
              productModel={state.productModel}
              onBrandChange={handlers.handleBrandChange}
              onModelChange={handlers.handleModelChange}
              onStartYearChange={handlers.handleStartYearChange}
              onLastYearChange={handlers.handleLastYearChange}
              onModelAdded={handlers.handleOnItemAdded}
            />
            
            <Button 
              onClick={handlers.handleCarModelAdded} 
              variant="contained" 
              sx={{ mt: 2 }}
              disabled={state.isAddButtonDisabled}
            >
              Agregar Modelo
            </Button>
          </>
        )}

        <ModelsTable
          models={state.product.carModels}
          onDelete={handlers.handleDeleteModel}
          readOnly={readOnly}
        />
      </ExpandableCard>

      <ConflictModal
        isOpen={state.conflictState.isModalOpen}
        onClose={handlers.resetConflictState}
        onConfirm={handlers.handleConfirmForceCreate}
        conflictModel={state.conflictState.conflictModel}
      />
    </>
  );
};

export default ModelManager; 