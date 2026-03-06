import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Box,
  Container,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

import { productSchema } from './productSchema';
import type { Product, ProductFormData } from '../../types/product.types';
import { PRODUCT_TYPE_MAP } from '../../constants/productConstants';
import { useProduct } from '../../hooks/useProducts';
import { useProductMutations } from '../../hooks/useProductMutations';
import { ProductImageService } from '../../services/ProductImageService';
import { createProduct as createProductRequest } from '../../services/ProductService';
import { updateProduct as updateProductRequest } from '../../services/ProductService';
import PageHeader from '../../components/common/PageHeader';

// Import product-specific form components
import RadiatorForm from './forms/productTypeForms/RadiatorForm';
import CapForm from './forms/productTypeForms/CapForm';
import AccessoryForm from './forms/productTypeForms/AccessoryForm';
import type { File as AppFile } from '../../types/common.types';
import type { ProductCarModel } from '../../types/product.types';
import type { ProductComponentFormEntry } from '../../types/product.types';
import type { ProductComponentRelation } from '../../types/product.types';
import type { ProductComponentDraftFormData } from '../../types/product.types';
import type { ProviderProduct } from '../../types/product.types';
import type { ProductFormProvider } from '../../types/product.types';
import type { ProductFormPrice } from '../../types/product.types';

const CAP_PRODUCT_TYPE_ID = Number(PRODUCT_TYPE_MAP.tapas);

const mapProductProvidersToForm = (productProviders: Product['productProviders'] = []): ProductFormProvider[] => (
  productProviders.map((pp) => ({
    providerId: pp.providerId,
    numSeries: pp.numSeries,
    purchasePrice: pp.price.cost,
    providerName: pp.provider.name,
  }))
);

const mapFormProvidersToPayload = (productProviders: ProductFormProvider[] = []): ProviderProduct[] => (
  productProviders.map((provider) => ({
    providerId: provider.providerId,
    numSeries: provider.numSeries,
    price: { cost: provider.purchasePrice, description: 'Precio de compra' },
  })) as ProviderProduct[]
);

const mapFormPricesToPayload = (productPrices: ProductFormPrice[] = []) => (
  productPrices.map((price) => ({
    price: { description: price.description, cost: price.cost },
  }))
);

const uploadProductFiles = async (files: (AppFile | File)[] = []) => (
  ProductImageService.uploadFiles(files as AppFile[])
);

// Helper function to transform API data to form data
const transformProductToFormData = (product: Product): ProductFormData => {
  return {
    name: product.name || '',
    dpi: product.dpi || '',
    stockCount: product.stockCount || 0,
    comments: product.comments || '',
    files: product.files || [],
    productCarModels: product.productCarModels?.map(pcm => ({
      carModelId: pcm.carModelId,
      initialYear: pcm.initialYear,
      lastYear: pcm.lastYear,
      brandName: pcm.carModel.brand?.name || 'Marca Desconocida',
      modelName: pcm.carModel.name || 'Modelo Desconocido',
    })) || [],
    productProviders: mapProductProvidersToForm(product.productProviders),
    productPrices: product.productPrices?.map(pp => ({
      description: pp.price.description,
      cost: pp.price.cost,
    })) || [],
    components: product.components?.map((component) => ({
      source: 'existing' as const,
      componentProductId: component.componentProductId,
      componentProduct: component.componentProduct,
    })) || [],
    componentsTouched: false,
    // Add product-specific fields here if they exist in the Product type
    // For example:
    // coreMaterial: (product as any).coreMaterial,
    // finType: (product as any).finType,
  };
};

// NUEVA FUNCIÓN para transformar los datos del formulario al payload del backend
const transformFormDataToPayload = async (
  formData: ProductFormData,
  productTypeId: number,
  options?: {
    components?: ProductComponentRelation[];
  }
): Promise<Partial<Product>> => {
  // 1. Manejar la subida de archivos
  const uploadedFiles = await uploadProductFiles(formData.files);
  // 2. Mapear y transformar los datos para el backend
  const payload: Partial<Product> = {
    name: formData.name,
    dpi: formData.dpi,
    stockCount: formData.stockCount,
    comments: formData.comments,
    productTypeId: productTypeId as Product['productTypeId'],
    files: uploadedFiles as AppFile[],
    productCarModels: formData.productCarModels.map(pcm => ({
      carModelId: pcm.carModelId,
      initialYear: pcm.initialYear,
      lastYear: pcm.lastYear,
    })) as ProductCarModel[],
    productProviders: mapFormProvidersToPayload(formData.productProviders),
    productPrices: mapFormPricesToPayload(formData.productPrices),
  };

  if (options?.components !== undefined) {
    payload.components = options.components;
  }

  return payload;
};

const transformCapDraftToPayload = async (
  draft: ProductComponentDraftFormData
): Promise<Partial<Product>> => {
  const uploadedFiles = await uploadProductFiles(draft.files);

  return {
    name: draft.name,
    dpi: draft.dpi,
    stockCount: 0,
    productTypeId: CAP_PRODUCT_TYPE_ID as Product['productTypeId'],
    files: uploadedFiles as AppFile[],
    productCarModels: [],
    productProviders: mapFormProvidersToPayload(draft.productProviders),
    productPrices: [],
  };
};

const resolveComponentsForSubmit = async (
  components: ProductComponentFormEntry[]
): Promise<ProductComponentRelation[]> => {
  const resolvedComponents: ProductComponentRelation[] = [];

  for (const component of components) {
    if (component.source === 'existing') {
      if (component.draftDirty && component.draft) {
        const updatedComponentPayload = await transformCapDraftToPayload(component.draft);
        await updateProductRequest(component.componentProductId, updatedComponentPayload as Product);
      }

      resolvedComponents.push({
        componentProductId: component.componentProductId,
      });
      continue;
    }

    const componentPayload = await transformCapDraftToPayload(component.draft);
    const createdComponent = await createProductRequest(componentPayload as Product);

    if (!createdComponent.id) {
      throw new Error('No se pudo obtener el ID de la tapa creada.');
    }

    resolvedComponents.push({
      componentProductId: createdComponent.id,
    });
  }

  return resolvedComponents;
};


const ProductFormPage = () => {
  const { productId, productType: productTypeParam } = useParams<{ productId: string; productType: string }>();
  const navigate = useNavigate();
  const isEditMode = !!productId;
  const [isReadOnly, setIsReadOnly] = useState(isEditMode);

  const numericProductId = isEditMode ? parseInt(productId, 10) : null;
  const numericProductType = productTypeParam ? parseInt(PRODUCT_TYPE_MAP[productTypeParam], 10) : 0;

  const { data: productData, isLoading: isLoadingProduct } = useProduct(numericProductId);
  const { createProduct, isCreating, updateProduct, isUpdating } = useProductMutations();

  const methods = useForm<ProductFormData>({
    // @ts-expect-error - Yup schema type inference issue
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      dpi: '',
      stockCount: 0,
      comments: '',
      files: [],
      productCarModels: [],
      productProviders: [],
      productPrices: [],
      components: [],
      componentsTouched: false,
    },
  });

  useEffect(() => {
    if (isEditMode && productData) {
      const transformedData = transformProductToFormData(productData);
      methods.reset(transformedData);
    }
  }, [productData, isEditMode, methods]);

  const { watch, setValue } = methods;
  const dpi = watch('dpi');
  const stockCount = watch('stockCount');
  const productCarModels = watch('productCarModels');

  useEffect(() => {
    if (productTypeParam === 'radiadores') {
      const carModelsString = productCarModels
        ?.map(cm => `${cm.modelName} (${cm.initialYear}-${cm.lastYear})`)
        .join('-');
      
      const name = `${dpi || ''} ${carModelsString || ''} [${stockCount || 0}]`.trim();
      setValue('name', name);
    }
  }, [dpi, stockCount, productCarModels, productTypeParam, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const shouldSendComponents = isEditMode
        ? data.componentsTouched
        : data.components.length > 0;
      const resolvedComponents = shouldSendComponents
        ? await resolveComponentsForSubmit(data.components)
        : undefined;
      const payload = await transformFormDataToPayload(data, numericProductType, {
        components: shouldSendComponents ? resolvedComponents : undefined,
      });

      if (isEditMode) {
        updateProduct({ id: numericProductId!, data: payload as Product }, {
          onSuccess: () => setIsReadOnly(true),
        });
      } else {
        createProduct(payload as Product);
      }
    } catch (error) {
      console.error("Error al preparar o enviar el formulario:", error);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  if (isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleCancel = () => {
    if (isEditMode) {
      setIsReadOnly(true);
      if (productData) methods.reset(transformProductToFormData(productData));
    } else {
      navigate(`/products/${productTypeParam}`);
    }
  };

  const renderHeaderButton = () => {
    if (isReadOnly && isEditMode) {
      return (
        <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsReadOnly(false)}>
          Editar
        </Button>
      );
    }
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} startIcon={<SaveIcon />}>
          {isSubmitting ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Guardar Producto')}
        </Button>
      </Box>
    );
  };

  const renderProductSpecificForm = () => {
    const isNameReadOnly = productTypeParam === 'radiadores';
    switch (productTypeParam) {
      case 'radiadores':
        return <RadiatorForm isReadOnly={isReadOnly} isNameReadOnly={isNameReadOnly} />;
      case 'tapas':
        return <CapForm isReadOnly={isReadOnly} />;
      case 'accesorios':
        return <AccessoryForm isReadOnly={isReadOnly} />;
      default:
        return (
          <Typography variant="body2" color="error">
            Tipo de producto desconocido: {productTypeParam}
          </Typography>
        );
    }
  };

  return (
    <FormProvider {...methods}>
      {/* @ts-expect-error - React Hook Form type inference issue with Yup resolver */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <PageHeader
            title={isEditMode ? 'Detalle del Producto' : `Crear Nuevo ${productTypeParam || 'Producto'}`}
            actionButton={renderHeaderButton()}
          />
          {renderProductSpecificForm()}
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductFormPage;
