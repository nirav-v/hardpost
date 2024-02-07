import { Box } from '@chakra-ui/react';
import FilterCheckbox from '../../components/inputs/FilterCheckbox.js';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid.js';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Item } from '../../types/ItemTypes.js';

import { useItemsQuery } from '../../hooks/useItemsQuery';

function ShopPage() {
  // const [items, setItems] = useItemsContext();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // request items from api then sort returned data
  const { isPending, isError, data: itemData, error } = useItemsQuery();

  if (itemData)
    itemData.sort((item2, item1) => {
      if (!item2.sold && item1.sold) return -1;
      return 0;
    });

  // searchParams object doesn't show any iterable param values, so spreading it into array gives get nested array of [key, value] query params
  // e.g [['category', 'decks'], ['category', 'wheels']]
  const paramsArray = [...searchParams];
  // create array of only param values to be used for filtering and items state, and providing default value to checkbox component
  // e.g ['decks', 'wheels']
  const filterChoices: string[] = [];
  for (let param of paramsArray) {
    filterChoices.push(param[1]);
  }

  useEffect(() => {
    // console.log("params array", paramsArray);
    // console.log("filter choices", filterChoices);
    if (filterChoices.length && itemData) {
      // get filtered array of items with matching category

      const updatedItems = itemData.filter(item =>
        filterChoices.includes(item.category)
      );
      setFilteredItems(updatedItems);

      return;
    }

    setFilteredItems(itemData ? itemData : []);
  }, [filterChoices.length, itemData]);

  if (isPending) return <div>Loading.....</div>;

  return (
    <div>
      <FilterCheckbox
        defaultValue={filterChoices}
        onChange={(choices: string[]) => {
          setSearchParams({ category: choices });
        }}
      />
      {filteredItems.length ? (
        <ProductGrid>
          {filteredItems.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ProductGrid>
      ) : null}
    </div>
  );
}

export default ShopPage;
