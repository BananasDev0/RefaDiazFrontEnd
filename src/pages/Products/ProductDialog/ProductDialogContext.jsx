import { createContext, useContext, useEffect, useState } from 'react';
import { processRadiatorData } from '../../../services/RadiatorService';
import { ProductCarModel } from '../../../models/ProductCarModel';
import ProductPrice from '../../../models/ProductPrice';
import Price from '../../../models/Price';
import { useProductsContext } from '../ProductsContext';
import { uploadImageToStorage } from '../../../services/Firebase/storage';
import { base64ToBlob, getMimeType, modifyAndClone } from '../../../util/generalUtils';
import File from '../../../models/File';
import { createProductFiles } from '../../../services/ProductService';
import { useSnackbar } from '../../../components/SnackbarContext';
import Product from '../../../models/Product';

const ProductDialogContext = createContext();

export const useProductDialogContext = () => useContext(ProductDialogContext);

export const ProductDialogProvider = ({ children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [product, setProduct] = useState(new Product({}));
    const [associatedVehicleModels, setAssociatedVehicleModels] = useState([])
    const [associatedPrices, setAssociatedPrices] = useState([]);
    const { productType, handleCloseDialog } = useProductsContext();
    const dependencies = [productType, associatedVehicleModels,
        associatedPrices, product.stockCount, product.comments, product.dpi];
    const [isLoading, setIsLoading] = useState(false);
    const { openSnackbar } = useSnackbar()
    console.log('asd', product)

    const [images, setImages] = useState([]);

    const resetState = () => {
        setActiveStep(0);
        setProduct({ product: {} });
        setAssociatedVehicleModels([]);
        setAssociatedPrices([]);
        setImages([]);
    };

    const handleSetProduct = (newProduct) => {
        console.log('dafaq', newProduct)
        setProduct(new Product(newProduct));
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let orderId = product.files.length + 1;
            let newFile = new File({ fileData: reader.result, orderId });
            setProduct(modifyAndClone(product, 'files', [...product.files, newFile]));
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index) => {
        setProduct(modifyAndClone(product, 'files', product.files.filter((_, i) => i !== index)));
    };

    useEffect(() => {
        const formattedName = formatProductName(productType, product, associatedVehicleModels, associatedPrices);
        
    }, dependencies);


    const formatProductName = (productType, product, vehicleModels) => {
        switch (productType) {
            case 'radiadores':
                return `${product.dpi} ${vehicleModels.map(vm => `${vm.model.name} (${vm.startYear}-${vm.endYear})`).join('-')} [${product.stockCount}]`;
            default:
                return product.name; // Devuelve el nombre existente si el tipo de producto no coincide
        }
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
    };

    const handleSubmit = async (productType) => {
        try {
            setIsLoading(true);
            let createdProduct = null;

            let vehicleModels = associatedVehicleModels.map(vehicleModel => {
                return new ProductCarModel({
                    vehicleModelId: vehicleModel.model.id,
                    initialYear: vehicleModel.startYear,
                    lastYear: vehicleModel.endYear
                });
            });

            let prices = associatedPrices.map(price => {
                return new ProductPrice({
                    price: new Price({
                        description: price.description,
                        cost: price.cost
                    })
                });
            });

            switch (productType) {
                case 'radiadores':
                    createdProduct = await processRadiatorData(product, vehicleModels, prices);
                    break
            }

            let baseFileName = `/products/images/${createdProduct.product.id}`;  // Usa UUID en lugar de product.id
            let files = [];

            images.forEach((image, index) => {
                let fileName = `${baseFileName}(${index})`;
                uploadImageToStorage(base64ToBlob(image), fileName);
                files.push(new File({
                    name: `${createdProduct.product.id}(${index})`,
                    mimeType: getMimeType(image),
                    storagePath: fileName
                }));
                product.imageUrl = fileName;
            });

            await createProductFiles(createdProduct.product.id, files);
            setIsLoading(false);
            handleCloseDialog();
            resetState();
            openSnackbar('Producto creado exitosamente', 'success');
        } catch (error) {
            setIsLoading(false);
            openSnackbar(`Error al procesar el producto: ${error.errorMessage}`, 'error');
        }
    }

    return (
        <ProductDialogContext.Provider value={{
            activeStep,
            associatedPrices,
            associatedVehicleModels,
            images,
            isLoading,
            isNextEnabled,
            product,
            totalSteps: 3,
        
            handleBack,
            handleImageDelete,
            handleImageUpload,
            handleNext,
            handleSetProduct,
            handleSubmit,
            resetState,
            setActiveStep,
            setAssociatedPrices,
            setAssociatedVehicleModels,
            setIsNextEnabled
        }}>
            {children}
        </ProductDialogContext.Provider>
        
    );
};
