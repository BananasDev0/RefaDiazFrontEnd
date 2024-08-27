import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddUserImg from '/src/assets/adduser.png';

const UserMenu = ({ onOptionSelect }) => {
  const options = [
    {
      id: 'add-user',
      title: 'Agregar Usuario',
      imageUrl: AddUserImg,  // Reemplaza esto con la ruta de la imagen adecuada
      description: 'Añade un nuevo usuario al sistema',
    },
    // Agrega más opciones aquí si es necesario en el futuro
  ];

  return (
    <Grid container spacing={4}>
      {options.map((option) => (
        <Grid item xs={12} sm={6} md={4} key={option.id}>
          <Card>
            <CardActionArea onClick={() => onOptionSelect(option.id)}>
              <CardMedia
                component="img"
                height="140"
                image={option.imageUrl}
                alt={option.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserMenu;