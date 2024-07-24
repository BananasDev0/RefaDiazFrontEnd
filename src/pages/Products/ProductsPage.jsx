
import { ProductsProvider } from "./ProductsContext";
import NavigationManager from "../../components/NavigationManager";
import ProductTypeSelector from "./ProductTypeSelector";

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <NavigationManager initialComponent={<ProductTypeSelector />} initialTitle="Productos" />
    </ProductsProvider>
  )
}
