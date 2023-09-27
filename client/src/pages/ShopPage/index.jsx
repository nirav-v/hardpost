import { Box } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useItemsContext } from "../../context/ItemsContext";

function ShopPage() {
  const [items, setItems] = useItemsContext();

  return (
    <div>
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
