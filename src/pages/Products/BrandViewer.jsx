import ItemsCardList from '../../components/ItemCardList'; // Asegúrate de que la ruta sea correcta

// Array de objetos marca
const brands = [
  { id: 1, name: 'MAZDA', imageUrl: 'https://upload.wikimedia.org/wikipedia/nah/b/b1/Mazda_logo.png?20080728005359' },
  { id: 2, name: 'HONDA', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg' },
  { id: 3, name: 'FORD', imageUrl: '' },
  { id: 4, name: 'KIA', imageUrl: '' },
  // Agrega más marcas según sea necesario
];

// Definición de las columnas para mostrar en cada ItemCard
const columns = [
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'}, }, // `showLabel: false` para no mostrar el label
  // No necesitamos definir una columna para `imageUrl` dado que se manejará internamente en ItemCard
];

// Componente BrandViewer
const BrandViewer = () => {
  return (
    <div>
      <ItemsCardList rows={brands} columns={columns} itemCardProps={{}} />
    </div>
  );
};

export default BrandViewer;
