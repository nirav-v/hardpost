import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { Item } from '../../types/ItemTypes';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

type FilterCheckboxProps = {
  itemData: Item[];
  setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

function FilterCheckbox({ itemData, setFilteredItems }: FilterCheckboxProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // create array of only category param values to be used for filtering and items state, and providing default value to checkbox component
  // e.g ['decks', 'wheels']
  const filterChoices = searchParams.getAll('category');

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
    <CheckboxGroup
      colorScheme="green"
      value={filterChoices}
      onChange={handleFilterChange}>
      <Stack
        p={4}
        justifyContent="center"
        // spacing={[1, 5]}
        direction={['column', 'row']}>
        <h2>Filter by </h2>
        <Checkbox value="decks">Decks</Checkbox>
        <Checkbox value="shoes">Shoes</Checkbox>
        <Checkbox value="trucks">Trucks</Checkbox>
        <Checkbox value="wheels">Wheels</Checkbox>
        <Checkbox value="pants">Pants</Checkbox>
        <Checkbox value="other">Other</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
}

export default FilterCheckbox;
