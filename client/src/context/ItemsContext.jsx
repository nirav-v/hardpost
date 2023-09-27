import React, { useState, useEffect, createContext, useContext } from "react";

const ItemsContext = createContext();

const useItemsContext = () => useContext(ItemsContext);
const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Make the fetch request here
    fetch("/shop")
      .then((response) => response.json())
      .then((items) => {
        // sort items in place by available items first
        items.sort((item2, item1) => {
          if (!item2.sold && item1.sold) return -1;
        });

        // set the global items state
        setItems(items);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <ItemsContext.Provider value={[items, setItems]}>
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsProvider, useItemsContext };
