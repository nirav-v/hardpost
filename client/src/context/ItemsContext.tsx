import React, { useState, useEffect, createContext, useContext } from "react";
import { Item } from "../types/ItemTypes";
import { shopApi } from "../api/shopApi";

type ItemsContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];

const ItemsContext = createContext<ItemsContextType>([[], () => {}]); // default values to be filled with items and setItems from useState

const useItemsContext = () => useContext(ItemsContext);

const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  // console.log(items);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items: Item[] = await shopApi.getAllItems();
        // sort items in place by available items first
        items.sort((item2, item1) => {
          if (!item2.sold && item1.sold) return -1;
          return 0;
        });
        // set the global items state
        setItems(items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={[items, setItems]}>
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsProvider, useItemsContext };
