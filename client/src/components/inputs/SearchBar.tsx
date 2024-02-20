import React from 'react';
import { Item } from '../../types/ItemTypes';
import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {
  filteredItems: Item[];
  itemData: Item[];
  setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function SearchBar({
  filteredItems,
  itemData,
  setFilteredItems,
}: SearchBarProps) {
  let [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  console.log(itemData, filteredItems);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('in submit');
    if (!search?.length) return setFilteredItems(itemData);
    const searchRegex = new RegExp(search, 'gi');
    const matchingItems = itemData.filter(item => searchRegex.test(item.name));
    setFilteredItems(matchingItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={e => setSearchParams({ search: e.target.value })}
        type="text"
      />
    </form>
  );
}
