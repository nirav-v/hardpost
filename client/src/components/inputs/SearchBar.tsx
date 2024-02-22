import React, { useEffect, useState } from 'react';
import { Item } from '../../types/ItemTypes';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Button, Input, shouldForwardProp } from '@chakra-ui/react';
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
  const searchResults = useSearchItemsQuery(searchTerm);
  const [errorText, setErrorText] = useState('');

  // if invalid search with no results, render error message
  useEffect(() => {
    if (searchResults.data?.length) {
      setErrorText('');
      setFilteredItems(searchResults.data);
    }
    if (searchTerm && !searchResults.data?.length)
      setErrorText('sorry we could not find any items for that search');
  }, [searchResults.data]);

  useEffect(() => {
    searchResults.refetch();
  }, [searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(searchParams => {
      searchParams.set('search', search);
      return searchParams;
    });
  };

  return (
    <Box display={'flex'} flexDirection="column" alignItems={'center'}>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="search for items"
        />
      </form>
      <Button type="submit">submit</Button>
      <Button
        onClick={() => {
          setSearchParams({});
        }}>
        Reset
      </Button>
      <p>{errorText}</p>
    </Box>
  );
}
