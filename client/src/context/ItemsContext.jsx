import React, { useState, createContext, useContext } from "react";

const ItemsContext = createContext();

const useItemsContext = () => {
  return useContext(ItemsContext);
};

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <ItemsContext.Provider value={[items, setItems]}>
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsProvider, useItemsContext };
