// src/pages/Products/ProductsPage.jsx
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import ProductTypeSelector from './ProductTypeSelector/ProductTypeSelector';
import SearchWrapper from './SearchWrapper';
import BrandContainer from './BrandViewer/BrandContainer';
import CarModelListContainer from './ModelViewer/CarModelContainer';
import ProductContainer from './ProductViewer/ProductContainer';
import { SelectionProvider } from './SelectionContext';
import { SearchProvider } from './SearchContext';
import { DialogProvider } from './DialogContext';
import { LoadingProvider } from './LoadingContext';
import { ProductDialogProvider } from './ProductDialog/ProductDialogContext';

export default function ProductsPage() {
  return (
    <SelectionProvider>
      <SearchProvider>
        <ProductDialogProvider>
        <DialogProvider>
          <LoadingProvider>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<ProductTypeSelector />} />
              <Route path="list/*" element={<SearchWrapper />}>
                <Route path="brands" element={<BrandContainer />} />
                <Route path="brands/models" element={<CarModelListContainer />} />
                <Route path="brands/models/products" element={<ProductContainer />} />
              </Route>
            </Routes>
          </LoadingProvider>
        </DialogProvider>
        </ProductDialogProvider>
      </SearchProvider>
    </SelectionProvider>
  );
}