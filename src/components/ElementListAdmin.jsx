import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import UserPage from '../pages/Users/UserPage.jsx'

export default function ElementListAdmin({setComponent}) {

    const icons = [
        <ManageAccountsIcon />,
        
    ];
    const components = [
        <UserPage/>
    ];

    const handleItemClick = (tab) => {
        setComponent(components[tab]);
    };

    return (
        <List>
            {['Usuarios'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleItemClick(index)}>
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