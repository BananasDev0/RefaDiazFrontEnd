import { useState } from 'react';
import { useProductDialogForm } from '../../ProductDialogFormContext';
import { useProviders } from './useProviders';
import { modifyAndClone } from '../../../../../util/generalUtils';

export const useProviderManager = (editable = true) => {
  const { product, setProduct } = useProductDialogForm();
  const { providers, setProviders, handleProviderCreation } = useProviders();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [price, setPrice] = useState('');
  const [numSeries, setNumSeries] = useState('');
  const [modalState, setModalState] = useState({
    isOpen: false,
    provider: null
  });

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleNumSeriesChange = (value) => {
    setNumSeries(value);
  };

  const handleAddProvider = () => {
    if (selectedProvider && price && numSeries) {
      const newProviderProduct = {
        providerId: selectedProvider.id,
        provider: selectedProvider,
        price: {
          cost: parseFloat(price),
          description: `Precio de compra de ${selectedProvider.name}`
        },
        numSeries: numSeries
      };
      setProduct(modifyAndClone(product, 'providers', [...(product.providers || []), newProviderProduct]));
      resetForm();
    }
  };

  const handleDeleteProvider = (index) => {
    const newProviders = product.providers.filter((_, i) => i !== index);
    setProduct(modifyAndClone(product, 'providers', newProviders));
  };

  const handleProviderClick = (provider) => {
    setModalState({
      isOpen: true,
      provider
    });
  };

  const resetForm = () => {
    setSelectedProvider(null);
    setPrice('');
    setNumSeries('');
  };

  return {
    state: {
      providers,
      selectedProvider,
      price,
      numSeries,
      modalState,
      product,
      editable
    },
    handlers: {
      handleProviderChange,
      handlePriceChange,
      handleNumSeriesChange,
      handleAddProvider,
      handleDeleteProvider,
      handleProviderClick,
      handleProviderCreation,
      setModalState,
      setProviders
    },
    isAddButtonDisabled: !selectedProvider || !price || !numSeries
  };
}; 