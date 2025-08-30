// src/constants/navItems.ts
import type { SvgIconProps } from '@mui/material/SvgIcon';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RoleName } from '../types/user.types';

export interface NavItem {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  path: string;
  roles: RoleName[];
}

export const mainNavItems: NavItem[] = [
  {
    text: 'Productos',
    icon: <InventoryIcon />,
    path: '/products',
    roles: [RoleName.ADMIN, RoleName.EMPLOYEE],
  },
  {
    text: 'Proveedores',
    icon: <LocalShippingIcon />,
    path: '/providers',
    roles: [RoleName.ADMIN, RoleName.EMPLOYEE],
  },
];

export const adminNavItems: NavItem[] = [
  {
    text: 'Usuarios',
    icon: <ManageAccountsIcon />,
    path: '/users',
    roles: [RoleName.ADMIN],
  },
];
