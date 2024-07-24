import React, { useState, useCallback } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const NavigationManager = ({ initialComponent, initialTitle }) => {
  const [navigationStack, setNavigationStack] = useState([
    { component: initialComponent, title: initialTitle }
  ]);

  const navigate = useCallback((component, title) => {
    setNavigationStack(prevStack => [...prevStack, { component, title }]);
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationStack(prevStack => prevStack.slice(0, -1));
  }, []);

  const resetNavigation = useCallback(() => {
    setNavigationStack(prevStack => [prevStack[0]]);
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