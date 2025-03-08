// src/pages/Products/ProductsPage.jsx
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import ProductTypeSelector from './ProductTypeSelector/ProductTypeSelector';
import SearchWrapper from './SearchWrapper';
import BrandContainer from './BrandViewer/BrandContainer';
import CarModelListContainer from './ModelViewer/CarModelContainer';
import ProductContainer from './ProductViewer/ProductContainer';
import { ProductSelectionProvider } from './ProductSelectionContext';
import { ProductSearchProvider } from './ProductSearchContext';
import { ProductDialogProvider } from './ProductDialogContext';
import { ProductLoadingProvider } from './ProductLoadingContext';
import { ProductDialogNavigationProvider } from './ProductDialog/ProductDialogNavigationContext';
import { ProductDialogFormProvider } from './ProductDialog/ProductDialogFormContext';
import { ProductDialogImageProvider } from './ProductDialog/ProductDialogImageContext';

export default function ProductsPage() {
  return (
    <ProductSelectionProvider>
      <ProductSearchProvider>
        <ProductDialogProvider>
          <ProductDialogImageProvider>
            <ProductDialogFormProvider>
              <ProductDialogNavigationProvider>
                <ProductLoadingProvider>
                  <NavigationBar />
                  <Routes>
                    <Route path="/" element={<ProductTypeSelector />} />
                    <Route path="list/*" element={<SearchWrapper />}>
                      <Route path="brands" element={<BrandContainer />} />
                      <Route path="brands/models" element={<CarModelListContainer />} />
                      <Route path="brands/models/products" element={<ProductContainer />} />
                    </Route>
                  </Routes>
                </ProductLoadingProvider>
              </ProductDialogNavigationProvider>
            </ProductDialogFormProvider>
          </ProductDialogImageProvider>
        </ProductDialogProvider>
      </ProductSearchProvider>
    </ProductSelectionProvider>
  );
}