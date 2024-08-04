import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useNavigationContext } from './NavigationContext';

const staticTitles = {
    "/products": "Productos",
    "/products/brands": "Marcas",
    "/products/brands/models": "Modelos",
    "/products/brands/models/radiators": "Radiadores",
    "/providers": "Proveedores",
};

const NavigationBar = () => {
    const location = useLocation();
    const { dynamicTitles, defaultTitles, resetTitle } = useNavigationContext();
    const pathnames = location.pathname.replace('/home', '').split('/').filter((x) => x);

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: 1, pb: 1 }}>
            {pathnames.map((value, index) => {
                const to = `/home/${pathnames.slice(0, index + 1).join('/')}`;
                const last = index === pathnames.length - 1;
                const title = dynamicTitles[to] || defaultTitles[to] || staticTitles[`/${pathnames.slice(0, index + 1).join('/')}`] || value;

                const handleClick = () => {
                    resetTitle(to);
                };

                return last ? (
                    <Typography color="text.primary" key={to}>
                        {title}
                    </Typography>
                ) : (
                    <Link component={RouterLink} to={to} key={to} onClick={handleClick}>
                        {title}
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default NavigationBar;