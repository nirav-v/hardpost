import { Item } from '../../types/ItemTypes.js';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid.js';
import { useState } from 'react';
import { useItemsQuery } from '../../hooks/queries';
import SearchBar from '../../components/inputs/SearchBar.js';

function ShopPage() {
  // request items from api then sort returned data
  const { isPending, isError, data: itemData } = useItemsQuery();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  if (itemData)
    itemData.sort((item2, item1) => {
      if (!item2.sold && item1.sold) return -1;
      return 0;
    });

  if (isPending) return <div>Loading.....</div>;

  if (isError) return <div>sorry something went wrong...</div>;

  return (
    <div>
      <SearchBar
        itemData={itemData}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
      />
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
