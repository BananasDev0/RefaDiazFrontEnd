import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuProducts() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <div  {...bindTrigger(popupState)}>
            Productos
          </div>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Agregar Producto</MenuItem>
            <MenuItem onClick={popupState.close}>Ver Producto</MenuItem>
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
