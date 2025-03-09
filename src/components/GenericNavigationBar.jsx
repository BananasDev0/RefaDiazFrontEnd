import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { PATHS, FILTERED_SEGMENTS } from '../constants/paths';

const staticTitles = {
    [PATHS.PROVIDERS]: "Proveedores",
    [PATHS.USERS]: "Gestión de usuarios",
    [PATHS.ADD_USER]: "Agregar usuario",
};

const GenericNavigationBar = () => {
    const location = useLocation();

    // Obtener pathnames originales
    const originalPathnames = location.pathname.split('/').filter((segment) => segment);

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: 1, pb: 1 }}>
            {originalPathnames.map((value, index) => {
                // Construir la ruta completa incluyendo todos los segmentos
                const originalPathSegments = originalPathnames.slice(0, index + 1);
                const to = `/${originalPathSegments.join('/')}`;

                // Determinar si este segmento debe filtrarse visualmente
                const isFiltered = FILTERED_SEGMENTS.includes(value.toLowerCase());
                if (isFiltered) return null; // No mostrar este segmento en las migajas

                // Construir el título
                let title = staticTitles[to] || value;

                // Determinar si este es el último segmento visible
                const isLastVisible = index === originalPathnames.length - 1;

                return isLastVisible ? (
                    <Typography color="text.primary" key={to}>
                        {title}
                    </Typography>
                ) : (
                    <Link component={RouterLink} to={to} key={to}>
                        {title}
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default GenericNavigationBar; 