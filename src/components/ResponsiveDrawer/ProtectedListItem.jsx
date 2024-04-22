import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ProtectedComponent } from '../ProtectedComponent';

const ProtectedListItem = ({ text, icon, roles, handleClick, open }) => (
  <ProtectedComponent allowedRoles={roles} fallbackComponent={() => <div />}>
    <ListItem disablePadding sx={{ display: 'block' }} onClick={handleClick}>
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
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  </ProtectedComponent>
);

export default ProtectedListItem;
