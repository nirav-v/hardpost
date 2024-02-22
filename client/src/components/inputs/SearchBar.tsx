import React, { useEffect, useState } from 'react';
import { Item } from '../../types/ItemTypes';
import { useSearchParams } from 'react-router-dom';
import { Box, Input, shouldForwardProp } from '@chakra-ui/react';
import { useSearchItemsQuery } from '../../hooks/queries/useSearchItemsQuery';
import { shopApi } from '../../api/shopApi';

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

  console.log(
    'useSearchItemsQuery on page load',
    searchItems.data
    // 'filtered items state ',
    // filteredItems
  );

  useEffect(() => {
    if (searchItems.data?.length) setFilteredItems(searchItems.data);
  }, [searchItems.data]);

  useEffect(() => {
    searchItems.refetch();
  }, [searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(prev => ({ ...prev, search }));
  };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <form onSubmit={handleSubmit}>
        <Input onChange={e => setSearch(e.target.value)} type="text" />
      </form>
    </Box>
  );
}
