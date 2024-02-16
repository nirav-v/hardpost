import FilterCheckbox from '../../components/inputs/FilterCheckbox.js';
import { Item } from '../../types/ItemTypes.js';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid.js';
import { useState } from 'react';
import { useItemsQuery } from '../../hooks/useItemsQuery';

function ShopPage() {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  // request items from api then sort returned data
  const { isPending, isError, data: itemData } = useItemsQuery();

  if (itemData)
    itemData.sort((item2, item1) => {
      if (!item2.sold && item1.sold) return -1;
      return 0;
    });

  if (isPending) return <div>Loading.....</div>;

  if (isError) return <div>sorry something went wrong...</div>;

  return (
    <div>
      <FilterCheckbox setFilteredItems={setFilteredItems} itemData={itemData} />
      {filteredItems.length ? (
        <ProductGrid>
          {filteredItems.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ProductGrid>
      ) : (
        <div>sorry no items match those filters</div>
      )}
    </div>
  );
}

export default ShopPage;
