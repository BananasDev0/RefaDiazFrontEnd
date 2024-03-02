import { Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SignOut } from '../services/Firebase/signOut';
import { useNavigate } from 'react-router-dom';

export default function CustomToolBar({ handleDrawerOpen, open }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    SignOut();
    navigate('/');
  }
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      
      <Typography variant="h6" noWrap component="div">
        Refa Diaz
      </Typography>
      <button onClick={handleSignOut} >Sign Out</button>
    </Toolbar>
  );
}
