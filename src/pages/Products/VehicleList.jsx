import ItemsCardList from "../../components/ItemCardList";
import Brand from "../../models/Brand";
import VehicleModel from "../../models/VehicleModel";

// Definición de columnas para VehicleModelList
const columns = [
  { field: 'name', headerName: 'Modelo', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
  { field: 'brandName', headerName: 'Marca', showLabel: true, valueStyle: { fontSize: '16px' } },
];

// Ejemplos de modelos de vehículos Honda
const exampleVehicleModels = [
  new VehicleModel({
    id: 1,
    name: 'Civic',
    brand: new Brand({ id: 1, name: 'Honda', imageUrl: '' }) // La instancia de Brand para Honda
  }),
  new VehicleModel({
    id: 2,
    name: 'Accord',
    brand: new Brand({ id: 1, name: 'Honda', imageUrl: '' })
  }),
  new VehicleModel({
    id: 3,
    name: 'CR-V',
    brand: new Brand({ id: 1, name: 'Honda', imageUrl: '' })
  }),
];

// Componente VehicleModelList
const VehicleModelList = ({ onVehicleModelSelect }) => {
  // Preparar rows para ItemsCardList
  const rows = exampleVehicleModels.map(vehicleModel => ({
    id: vehicleModel.id,
    name: vehicleModel.name,
    brandName: vehicleModel.brand.name // Mostrar el nombre de la marca Honda
  }));

  return (
    <div>
      <ItemsCardList rows={rows} columns={columns} itemCardProps={{onClick: onVehicleModelSelect}} />
    </div>
  );
};

export default VehicleModelList;
