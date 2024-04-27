import ItemsCardList from "../../../components/ItemCardList";

// Componente VehicleModelList
const VehicleModelList = ({ vehicleModels, onVehicleModelSelect }) => {
  const columns = [
    { field: 'name', headerName: 'Modelo', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
  ];

  // Preparar rows para ItemsCardList
  const rows = vehicleModels.map(vehicleModel => ({
    id: vehicleModel.id,
    name: vehicleModel.name
  }));

  return (
    <div>
      <ItemsCardList rows={rows} columns={columns} itemCardProps={{onClick: onVehicleModelSelect}} />
    </div>
  );
};

export default VehicleModelList;
