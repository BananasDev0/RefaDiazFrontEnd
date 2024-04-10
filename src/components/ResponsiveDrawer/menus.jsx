import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ROLES } from '../../util/userConstants';
import UserPage from '../../pages/Users/UserPage';
import ProductsPage from '../../pages/Products/ProductsPage';
import ProviderPage from '../../pages/Providers/ProviderPage';

const mainMenus = [
    { text: 'Productos', icon: <InventoryIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], component: <ProductsPage /> },
    { text: 'Servicios', icon: <MiscellaneousServicesIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE] },
    { text: 'Autos', icon: <DirectionsCarFilledIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE] },
    { text: 'Proveedores', icon: <PersonIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], component: <ProviderPage /> },
];

const adminMenus = [
    { text: 'Usuarios', icon: <ManageAccountsIcon />, roles: [ROLES.ADMIN], component: <UserPage /> }
];

export { mainMenus, adminMenus }