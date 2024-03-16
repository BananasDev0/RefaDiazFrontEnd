import ItemsCardList from "../../components/ItemCardList";
import {Radiator} from "../../models/Radiator";
import {Product} from "../../models/Product";

// Definición de columnas para RadiatorList
const columns = [
  { field: 'dpi', headerName: 'DPI', showLabel: false, valueStyle: { fontWeight: 'bold', fontSize: '16px'} },
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { fontSize: '16px' } }
];

// Ejemplos de radiadores
const exampleRadiators = [
  new Radiator({
    id: 1,
    dpi: 'DPI1234',
    product: new Product({ name: 'Radiador Accord Modelo 10-15', imageUrl: 'https://runsa.com.mx/shop/wp-content/uploads/2021/09/2018-109648-600x450.jpg' })
  }),
  new Radiator({
    id: 2,
    dpi: 'DPI5678',
    product: new Product({ name: 'Radiador Accord Modelo 19-21', imageUrl: 'https://runsa.com.mx/shop/wp-content/uploads/2021/09/2018-109648-600x450.jpg' })
  }),
  new Radiator({
    id: 3,
    dpi: 'DPI91011',
    product: new Product({ name: 'Radiador Accord Modelo 22-24', imageUrl: 'https://runsa.com.mx/shop/wp-content/uploads/2021/09/2018-109648-600x450.jpg' })
  }),
];

// Componente RadiatorList
const RadiatorList = ({ onRadiatorSelect }) => {
  // Preparar rows para ItemsCardList
  const rows = exampleRadiators.map(radiator => ({
    id: radiator.id,
    dpi: radiator.dpi,
    name: radiator.product.name,
    imageUrl: radiator.product.imageUrl // Se muestra la imagen
  }));

  return (
    <div>
      <ItemsCardList rows={rows} columns={columns} itemCardProps={{onClick: onRadiatorSelect}} />
    </div>
  );
};

export default RadiatorList;
