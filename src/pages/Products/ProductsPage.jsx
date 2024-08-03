
import BrandContainer from "./BrandViewer/BrandContainer";
import CarModelListContainer from "./ModelViewer/CarModelContainer";
import { ProductsProvider } from "./ProductsContext";
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductContainer from "./ProductViewer/ProductContainer";
import ProductTypeSelector from "./ProductTypeSelector/ProductTypeSelector";
import SearchWrapper from "./SearchWrapper";

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<Navigate to="type" />} />
        <Route path="type" element={<ProductTypeSelector />} />
        <Route path="search" element={<SearchWrapper />}>
          <Route path="brands" element={<BrandContainer />} />
          <Route path="models" element={<CarModelListContainer />} />
          <Route path="radiators" element={<ProductContainer />} />
        </Route>
      </Routes>
    </ProductsProvider>
  )
}
