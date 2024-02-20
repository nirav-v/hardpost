import React, { useState } from 'react';
import { Item } from '../../types/ItemTypes';

type SearchBarProps = {
  itemData: Item[];
  setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function SearchBar({
  itemData,
  setFilteredItems,
}: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.length) return setFilteredItems(itemData);
    const searchRegex = new RegExp(search, 'gi');
    console.log(searchRegex);
    const matchingItems = itemData.filter(item => searchRegex.test(item.name));
    setFilteredItems(matchingItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
      />
    </form>
  );
}
