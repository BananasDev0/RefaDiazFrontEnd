import React, { useState, useCallback } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const NavigationManager = ({ initialComponent, initialTitle }) => {
  const [navigationStack, setNavigationStack] = useState([
    { component: initialComponent, title: initialTitle, onBack: null }
  ]);

  const navigate = useCallback((component, title, onBack = null) => {
    console.log('Navigating to:', onBack);
    setNavigationStack(prevStack => [...prevStack, { component, title, onBack }]);
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
      // Execute onBack for all views except the first one
      prevStack.slice(1).forEach(view => {
        if (view.onBack) {
          view.onBack();
        }
      });
      return [prevStack[0]];
    });
  }, []);

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
              // Execute onBack for all views that will be removed
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
      {renderBreadcrumbs()}
      {React.cloneElement(currentView.component, { navigate, navigateBack, resetNavigation })}
    </div>
  );
};

export default NavigationManager;