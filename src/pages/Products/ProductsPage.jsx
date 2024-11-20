
import BrandContainer from "./BrandViewer/BrandContainer";
import CarModelListContainer from "./ModelViewer/CarModelContainer";
import { ProductsProvider } from "./ProductsContext";
import { Routes, Route } from 'react-router-dom';
import ProductTypeSelector from "./ProductTypeSelector/ProductTypeSelector";
import SearchWrapper from "./SearchWrapper";
import NavigationBar from "../../components/NavigationBar";
import ProductContainer from "./ProductViewer/ProductContainer";

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProductTypeSelector />} />
        <Route path="/" element={<SearchWrapper />}>
          <Route path="brands" element={<BrandContainer />} />
          <Route path="brands/models" element={<CarModelListContainer />} />
          <Route path="/*" element={<ProductContainer />} />
        </Route>
      </Routes>
    </ProductsProvider>
  )
}
