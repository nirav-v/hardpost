import { Box } from "@chakra-ui/react";
import FilterCheckbox from "../../components/inputs/FilterCheckbox";
import { ProductCard } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";
import { useItemsContext } from "../../context/ItemsContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function ShopPage() {
  const [items, setItems] = useItemsContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // searchParams object doesn't show any iterable param values, so spreading it into array gives get nested array of [key, value] query params
  // e.g [['category', 'decks'], ['category', 'wheels']]
  const paramsArray = [...searchParams];
  // create array of only param values to be used for filtering and items state, and providing default value to checkbox component
  // e.g ['decks', 'wheels']
  const filterChoices = [];
  for (let param of paramsArray) {
    filterChoices.push(param[1]);
  }

  useEffect(() => {
    if (filterChoices.length) {
      // get filtered array of items with matching category
      const filteredItems = items.filter((item) => {
        for (const filter of filterChoices) {
          if (item.category === filter) return true;
          else return false;
        }
      });

      setItems(filteredItems);
      return;
    }
  }, [searchParams]);

  return (
    <div>
      <FilterCheckbox
        defaultValue={filterChoices}
        onChange={(choices) => {
          setSearchParams({ category: choices });
          // if no filters are selected, refresh so that all items are refetched from database and updated
          if (!choices.length) window.location.reload();
        }}
      />
      {items.length ? (
        <Box
          maxW="7xl"
          mx="auto"
          px={{
            base: "4",
            md: "8",
            lg: "12",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}>
          <ProductGrid>
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
        </Box>
      ) : null}
    </div>
  );
}

export default ShopPage;
