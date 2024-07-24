import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShipping from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ROLES } from '../../util/userConstants';
import UserPage from '../../pages/Users/UserPage';
import ProductsPage from '../../pages/Products/ProductsPage';
import ProviderPage from '../../pages/Providers/ProviderPage';

const mainMenus = [
    { text: 'Productos', icon: <InventoryIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], component: <ProductsPage />, title: 'Productos' },
    { text: 'Proveedores', icon: <LocalShipping />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], component: <ProviderPage />, title: 'Proveedores' },
];

const adminMenus = [
    { text: 'Usuarios', icon: <ManageAccountsIcon />, roles: [ROLES.ADMIN], component: <UserPage />, title: 'Gestión de Usuarios' }
];

export { mainMenus, adminMenus }