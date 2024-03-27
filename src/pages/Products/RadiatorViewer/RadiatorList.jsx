import ItemsCardList from "../../../components/ItemCardList";

// Definición de columnas para RadiatorList
const columns = [
  { field: 'dpi', headerName: 'DPI', showLabel: false, valueStyle: { fontWeight: 'bold', fontSize: '16px'} },
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { fontSize: '16px' } }
];

const RadiatorList = ({ radiators, onRadiatorSelect}) => {
  console.log("radiator list: ", radiators)
  // Preparar rows para ItemsCardList
  const rows = radiators.map(radiator => ({
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