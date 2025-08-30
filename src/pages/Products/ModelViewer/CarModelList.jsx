import ItemsCardList from "../../../components/ItemCardList";

// Componente VehicleModelList
const CarModelList = ({ carModels, onCarModelSelect, handleOnDelete, handleOnEdit }) => {
  const columns = [
    { field: 'name', headerName: 'Modelo', showLabel: false, valueStyle: { textTransform: 'uppercase', fontWeight: 'bold', fontSize: '18px'} },
  ];

  // Preparar rows para ItemsCardList
  const rows = carModels.map(carModel => ({
    id: carModel.id,
    name: carModel.name
  }));

  return (
    <div>
      <ItemsCardList rows={rows} columns={columns} cardContentMinHeight={80} itemCardProps={{ onClick: onCarModelSelect,
        menuOptions: [
          {
            label: 'Eliminar',
            onClick: handleOnDelete
          },
          {
            label: 'Editar',
            onClick: handleOnEdit
          }
        ]
      }} />
    </div>
  );
};

export default CarModelList;
