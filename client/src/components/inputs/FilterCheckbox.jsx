import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";

function FilterCheckbox({ onChange, defaultValue }) {
  return (
    <CheckboxGroup
      colorScheme="green"
      defaultValue={defaultValue}
      onChange={onChange}>
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
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
