import { Box, Button, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { Item } from '../../types/ItemTypes';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

type FilterCheckboxProps = {
  itemData: Item[];
  filteredItems: Item[];
  setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
  searchResults: UseQueryResult<Item[], Error>;
};

function FilterCheckbox({
  itemData,
  filteredItems,
  setFilteredItems,
  searchResults,
}: FilterCheckboxProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showCheckbox, setShowCheckbox] = useState(true);

  // create array of only category param values to be used for filtering and items state, and providing default value to checkbox component
  // e.g ['decks', 'wheels']
  const filterChoices = searchParams.getAll('category');

  useEffect(() => {
    if (filterChoices.length && itemData) {
      //update the filtered items based on category url params

      const updatedItems = itemData.filter(item =>
        filterChoices.includes(item.category)
      );
      setFilteredItems(updatedItems);

      return;
    }

    // // when the last filter is unchecked, reset the filtered items to either the last search if there is a search param or the full item data
    if (searchResults.data?.length) {
      setFilteredItems(searchResults.data);
      return;
    }
    // god this is so fucking messy
    setFilteredItems(itemData ? itemData : []);

    // whenever any of these dependencies change we need to update the filtered items
  }, [filterChoices.length, itemData, searchResults.data]);

  // solely responsible for mapping checkbox choices to the search params
  const handleFilterChange = (choices: string[]) => {
    setSearchParams(searchParams => {
      // append all non-existing filter choices to category params
      choices.forEach(choice => {
        if (!searchParams.has('category', choice)) {
          searchParams.append('category', choice);
        }
      });
      // go through current search params and delete and category values that are no longer in checkbox choices
      const choiceSet = new Set(choices);
      searchParams.forEach(param => {
        if (!choiceSet.has(param)) {
          searchParams.delete('category', param);
        }
      });
      return searchParams;
    });
  };

  return (
    <>
      <Button onClick={() => setShowCheckbox(!showCheckbox)} m="2">
        {showCheckbox ? 'hide filters' : 'show filters'}
      </Button>
      <Box display={showCheckbox ? 'block' : 'none'}>
        <CheckboxGroup
          colorScheme="green"
          value={filterChoices}
          onChange={handleFilterChange}>
          <Stack
            p={4}
            justifyContent="center"
            // spacing={[1, 5]}
            direction={['column', 'column', 'row']}>
            <h2>Filter by </h2>
            <Checkbox value="decks">Decks</Checkbox>
            <Checkbox value="shoes">Shoes</Checkbox>
            <Checkbox value="trucks">Trucks</Checkbox>
            <Checkbox value="wheels">Wheels</Checkbox>
            <Checkbox value="pants">Pants</Checkbox>
            <Checkbox value="other">Other</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
    </>
  );
}

export default FilterCheckbox;
