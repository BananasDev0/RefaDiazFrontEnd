import React, { useState, useCallback, useEffect } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

const NavigationManager = ({ initialComponent, initialTitle }) => {
  const [navigationStack, setNavigationStack] = useState([
    { component: initialComponent, title: initialTitle }
  ]);

  const navigate = useCallback((component, title) => {
    setNavigationStack(prevStack => {
      const existingIndex = prevStack.findIndex(item => item.title === title);
      if (existingIndex !== -1) {
        return prevStack.slice(0, existingIndex + 1);
      }
      return [...prevStack, { component, title }];
    });
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationStack(prevStack => prevStack.slice(0, -1));
  }, []);

  const resetNavigation = useCallback(() => {
    setNavigationStack(prevStack => [prevStack[0]]);
  }, []);

  // Nueva función para actualizar el título del breadcrumb actual
  const updateCurrentTitle = useCallback((newTitle) => {
    setNavigationStack(prevStack => {
      const newStack = [...prevStack];
      newStack[newStack.length - 1] = {
        ...newStack[newStack.length - 1],
        title: newTitle
      };
      return newStack;
    });
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigateBack();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigateBack]);

  const currentView = navigationStack[navigationStack.length - 1];

  const renderBreadcrumbs = () => (
    <Breadcrumbs aria-label="breadcrumb">
      {navigationStack.map((item, index) => {
        const isLast = index === navigationStack.length - 1;
        return isLast ? (
          <Typography key={index} color="text.primary">{item.title}</Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setNavigationStack(prevStack => prevStack.slice(0, index + 1));
            }}
          >
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );

  return (
    <div>
      <Box sx={{ marginBottom: '15px' }}>
        {renderBreadcrumbs()}
      </Box>
      {React.cloneElement(currentView.component, { 
        navigate, 
        navigateBack, 
        resetNavigation, 
        updateCurrentTitle  // Pasamos la nueva función al componente actual
      })}
    </div>
  );
};

export default NavigationManager;