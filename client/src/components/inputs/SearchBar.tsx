import React, { useState } from 'react';
import { Item } from '../../types/ItemTypes';
import { useSearchParams } from 'react-router-dom';
import { Box, Input } from '@chakra-ui/react';
import { useSearchItemsQuery } from '../../hooks/queries/useSearchItemsQuery';

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
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const searchItems = useSearchItemsQuery(searchTerm);

  console.log('useSearchItemsQuery on page load', searchItems.data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchParams({ search });
    console.log(searchTerm);
    searchItems.refetch();
    console.log('useSearchItemsQuery ', searchItems.data);
    // if (!search?.length) return setFilteredItems(itemData);
    // const searchRegex = new RegExp(search, 'gi');
    // console.log(searchRegex);
    // const matchingItems = filteredItems.filter(item =>
    //   searchRegex.test(item.name)
    // );
    // console.log(matchingItems);
    // setFilteredItems(matchingItems);
  };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <form onSubmit={handleSubmit}>
        <Input onChange={e => setSearch(e.target.value)} type="text" />
      </form>
    </Box>
  );
}
