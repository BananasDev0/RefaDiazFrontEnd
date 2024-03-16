import { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MobileContext = createContext();

export const useMobile = () => useContext(MobileContext);

export const MobileProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <MobileContext.Provider value={{
        isMobile
    }}>
      {children}
    </MobileContext.Provider>
  );
};
