import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShipping from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ROLES } from '../../util/userConstants';

const mainMenus = [
    { text: 'Productos', icon: <InventoryIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], title: 'Productos', path: '/home/products' },
    { text: 'Proveedores', icon: <LocalShipping />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], title: 'Proveedores', path: '/home/providers' },
];

const adminMenus = [
    { text: 'Usuarios', icon: <ManageAccountsIcon />, roles: [ROLES.ADMIN], title: 'Gestión de Usuarios', path: '/home/users' },
];

export { mainMenus, adminMenus }