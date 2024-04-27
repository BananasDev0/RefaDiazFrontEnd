import ItemsCardList from "../../../components/ItemCardList";

// Componente VehicleModelList
const VehicleModelList = ({ carModels, onCarModelSelect }) => {
  const columns = [
    { field: 'name', headerName: 'Modelo', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
  ];

  // Preparar rows para ItemsCardList
  const rows = carModels.map(vehicleModel => ({
    id: vehicleModel.id,
    name: vehicleModel.name
  }));

  return (
    <div>
      <ItemsCardList rows={rows} columns={columns} itemCardProps={{onClick: onCarModelSelect}} />
    </div>
  );
};

export default VehicleModelList;
