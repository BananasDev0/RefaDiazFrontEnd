import List from '@mui/material/List';
import ProtectedListItem from './ResponsiveDrawer/ProtectedListItem';

export default function ElementList({ setComponent, open, menuItems }) {
  const handleItemClick = (component) => {
    setComponent(component);
  };

  return (
    <List>
      {menuItems.map((item) => (
        <ProtectedListItem
          key={item.text}
          text={item.text}
          icon={item.icon}
          roles={item.roles}
          handleClick={() => handleItemClick(item.component)}
          open={open}
        />
      ))}
    </List>
  );
}
