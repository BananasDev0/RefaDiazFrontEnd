
import ItemsCardList from "../../../components/ItemCardList";
import CircularProgress from '@mui/material/CircularProgress';

// Definición de columnas para RadiatorList
const columns = [
  { field: 'dpi', headerName: 'DPI', showLabel: false, valueStyle: { fontWeight: 'bold', fontSize: '16px'} },
  { field: 'name', headerName: 'Nombre', showLabel: false, valueStyle: { fontSize: '16px' } }
];

const RadiatorList = ({ radiators, onRadiatorSelect, loading }) => {
  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <ItemsCardList rows={radiators.map(radiator => ({
          id: radiator.id,
          dpi: radiator.dpi,
          name: radiator.product.name,
          imageUrl: radiator.product.imageUrl // Se muestra la imagen
        }))} columns={columns} itemCardProps={{onClick: onRadiatorSelect}} />
      )}
    </div>
  );
};

export default RadiatorList;
