import React, { useState, useCallback, useEffect } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

const NavigationManager = ({ initialComponent, initialTitle }) => {
  const [navigationStack, setNavigationStack] = useState([
    { component: initialComponent, title: initialTitle, onBack: null }
  ]);

  const navigate = useCallback((component, title, onBack = null) => {
    setNavigationStack(prevStack => [...prevStack, { component, title, onBack }]);
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationStack(prevStack => {
      if (prevStack.length > 1) {
        const currentView = prevStack[prevStack.length - 1];
        if (currentView.onBack) {
          currentView.onBack();
        }
        return prevStack.slice(0, -1);
      }
      return prevStack;
    });
  }, []);

  const resetNavigation = useCallback(() => {
    setNavigationStack(prevStack => {
      prevStack.slice(1).forEach(view => {
        if (view.onBack) {
          view.onBack();
        }
      });
      return [prevStack[0]];
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
              navigationStack.slice(index + 1).forEach(view => {
                if (view.onBack) {
                  view.onBack();
                }
              });
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
      {<Box sx={{ marginBottom: '15px' }}>
        {renderBreadcrumbs()}</Box>}
      {React.cloneElement(currentView.component, { navigate, navigateBack, resetNavigation })}
    </div>
  );
};

export default NavigationManager;