import React, { useEffect, useState } from 'react';
import { Item } from '../../types/ItemTypes';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Button, Input, Text, shouldForwardProp } from '@chakra-ui/react';
import { useSearchItemsQuery } from '../../hooks/queries/useSearchItemsQuery';
import FilterCheckbox from './FilterCheckbox';

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

  useEffect(() => {
    if (searchResults.data?.length) {
      setErrorText('');
      setFilteredItems(searchResults.data);
    }
    // if invalid search with no results, render error message
    if (searchTerm && !searchResults.data?.length)
      setErrorText('sorry we could not find any items for that search');
  }, [searchResults.data, searchTerm]);

  // ensure we refetch and update search results every time the search param changes
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
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="search for items"
        />

        <Box display={'flex'} justifyContent={'space-evenly'} p="3">
          <Button type="submit">submit</Button>
          <Button
            onClick={() => {
              setSearchParams({});
              setSearch('');
              setErrorText('');
            }}>
            reset
          </Button>
        </Box>
      </form>
      <Text color={'red'}>{errorText}</Text>
      <FilterCheckbox
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        itemData={itemData}
        searchResults={searchResults}
      />
    </Box>
  );
}
