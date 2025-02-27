// src/components/NavigationBar.jsx
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelectionContext } from '../pages/Products/SelectionContext';
import { ProductTypesNamesEsp } from '../pages/Products/ProductsConstants';
import { PATHS, FILTERED_SEGMENTS } from '../constants/paths';

const staticTitles = {
    [PATHS.PRODUCTS]: "Productos",
    [PATHS.BRANDS]: "Marcas",
    [PATHS.MODELS]: "Modelos",
    [PATHS.PRODUCTS_LIST]: "Productos",
    [PATHS.PROVIDERS]: "Proveedores",
    [PATHS.USERS]: "Gestión de usuarios",
    [PATHS.ADD_USER]: "Agregar usuario",
};

const NavigationBar = () => {
    const location = useLocation();
    const { productType, selectedBrand, selectedCarModel, clearSelection } = useSelectionContext();

    // Obtener pathnames originales (con "home" y "list")
    const originalPathnames = location.pathname.split('/').filter((segment) => segment);

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ pt: 1, pb: 1 }}>
            {originalPathnames.map((value, index) => {
                // Construir la ruta completa incluyendo todos los segmentos
                const originalPathSegments = originalPathnames.slice(0, index + 1);
                const to = `/${originalPathSegments.join('/')}`; // Ruta completa con "home" y "list"

                // Determinar si este segmento debe filtrarse visualmente
                const isFiltered = FILTERED_SEGMENTS.includes(value.toLowerCase());
                if (isFiltered) return null; // No mostrar este segmento en las migajas

                // Construir el título con jerarquía y elemento seleccionado
                let title = staticTitles[to] || value;

                // Añadir el elemento seleccionado (productType) entre paréntesis en "Productos"
                if (to === PATHS.PRODUCTS && productType) {
                    const productName = ProductTypesNamesEsp[productType] || 'Productos';
                    title = `${title} (${productName})`;
                }

                // Añadir el elemento seleccionado (brand) entre paréntesis en "Marcas"
                if (to === PATHS.BRANDS && selectedBrand) {
                    title = `${title} (${selectedBrand.name})`;
                }

                // Añadir el elemento seleccionado (carModel) entre paréntesis en "Modelos"
                if (to === PATHS.MODELS && selectedCarModel) {
                    title = `${title} (${selectedCarModel.name})`;
                }

                // Determinar si este es el último segmento visible
                const isLastVisible = index === originalPathnames.length - 1
                const handleClick = () => {
                    if (!isLastVisible) {
                       clearSelection(to);
                    }
                };

                return isLastVisible ? (
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