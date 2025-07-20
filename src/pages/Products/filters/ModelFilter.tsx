import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useModels } from '../../../hooks/useVehicleData';
import { Model } from '../../../types/product.types';

const ModelFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const brandId = searchParams.get('brandId') ? parseInt(searchParams.get('brandId')!, 10) : null;

  const { data: models = [], isLoading: isLoadingModels } = useModels(brandId);

  useEffect(() => {
    const modelId = searchParams.get('modelId');
    if (modelId && models.length) {
      const model = models.find(m => m.id === parseInt(modelId, 10));
      setSelectedModel(model || null);
    } else if (!modelId) {
      setSelectedModel(null); // Clear selected model if modelId is removed from URL
    }
  }, [searchParams, models]);

  const handleModelChange = (_: any, newValue: Model | null) => {
    setSelectedModel(newValue);
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('modelId', newValue.id.toString());
    } else {
      params.delete('modelId');
    }
    setSearchParams(params);
  };

  return (
    <Autocomplete
      fullWidth
      options={models}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedModel}
      onChange={handleModelChange}
      loading={isLoadingModels}
      disabled={!brandId} // Disable if no brand is selected
      renderInput={(params) => (
        <TextField
          {...params}
          label="Modelo"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoadingModels ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ModelFilter;
