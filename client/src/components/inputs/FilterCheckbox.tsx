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

  // searchParams object doesn't show any iterable param values, so spreading it into array gives get nested array of [key, value] query params
  // e.g [['category', 'decks'], ['category', 'wheels']]
  const paramsArray = [...searchParams];

  // create array of only param values to be used for filtering and items state, and providing default value to checkbox component
  // e.g ['decks', 'wheels']
  const filterChoices: string[] = [];
  for (let param of paramsArray) {
    filterChoices.push(param[1]);
  }

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

  return (
    <CheckboxGroup
      colorScheme="green"
      defaultValue={filterChoices}
      onChange={(choices: string[]) => {
        setSearchParams({ category: choices });
      }}>
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
