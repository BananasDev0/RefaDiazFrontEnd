import React, { useState, useCallback, useEffect } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { extractMainTitle } from '../util/generalUtils';

const NavigationManager = ({ initialComponent, initialTitle }) => {
  const [navigationStack, setNavigationStack] = useState([
    { component: initialComponent, title: initialTitle }
  ]);

  const updateStack = useCallback((updater) => {
    setNavigationStack(updater);
  }, []);

  const navigate = useCallback((component, title) => {
    updateStack(prevStack => {
      const existingIndex = prevStack.findIndex(item => extractMainTitle(item.title) === extractMainTitle(title));
      return existingIndex !== -1 ? prevStack.slice(0, existingIndex + 1) : [...prevStack, { component, title }];
    });
  }, [updateStack]);

  const navigateBack = useCallback((stepsBack = 1) => {
    updateStack(prevStack => prevStack.slice(0, -stepsBack));
  }, [updateStack]);

  const resetNavigation = useCallback(() => {
    updateStack(prevStack => [prevStack[0]]);
  }, [updateStack]);

  const updateCurrentTitle = useCallback((newTitle) => {
    updateStack(prevStack => {
      const newStack = [...prevStack];
      newStack[newStack.length - 1] = { ...newStack[newStack.length - 1], title: newTitle };
      return newStack;
    });
  }, [updateStack]);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigateBack();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateBack]);

  const breadcrumbHandler = (index) => (e) => {
    e.preventDefault();
    const stepsBack = navigationStack.length - 1 - index;
    navigateBack(stepsBack);
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs aria-label="breadcrumb">
      {navigationStack.map((item, index) => {
        const isLast = index === navigationStack.length - 1;
        return isLast ? (
          <Typography key={index} color="text.primary">{item.title}</Typography>
        ) : (
          <Link key={index} color="inherit" href="#" onClick={breadcrumbHandler(index)}>
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );

  const currentView = navigationStack[navigationStack.length - 1];

  return (
    <div>
      <Box sx={{ marginBottom: '15px' }}>
        {renderBreadcrumbs()}
      </Box>
      {React.cloneElement(currentView.component, { 
        navigate, 
        navigateBack, 
        resetNavigation, 
        updateCurrentTitle
      })}
    </div>
  );
};

export default NavigationManager;