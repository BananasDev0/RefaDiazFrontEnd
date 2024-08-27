import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [dynamicTitles, setDynamicTitles] = useState({});
  const [defaultTitles, setDefaultTitles] = useState({});

  const updateTitle = (path, title) => {
    setDynamicTitles((prevTitles) => ({
      ...prevTitles,
      [path]: title,
    }));
  };

  const setDefaultTitle = (path, title) => {
    setDefaultTitles((prevTitles) => ({
      ...prevTitles,
      [path]: title,
    }));
  };

  const resetTitle = (path) => {
    setDynamicTitles((prevTitles) => {
      const newTitles = { ...prevTitles };
      Object.keys(newTitles).forEach((key) => {
        if (key.startsWith(path) && key !== path) {
          delete newTitles[key];
        }
      });
      delete newTitles[path];
      return newTitles;
    });
  };

  return (
    <NavigationContext.Provider value={{ dynamicTitles, updateTitle, setDefaultTitle, resetTitle, defaultTitles }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);