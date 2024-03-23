import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

export default function ElementList() {

    const icons = [
        <InventoryIcon />,
        <MiscellaneousServicesIcon />,
        <DirectionsCarFilledIcon />,
        <PersonIcon />,
    ];


    return (
        <List>
            {['Productos', 'Servicios', 'Autos', 'Proveedores'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {icons[index]}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}