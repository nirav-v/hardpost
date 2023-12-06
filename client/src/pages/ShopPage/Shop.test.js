import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { ItemsProvider } from "../../context/ItemsContext";
import CartProvider from "../../context/CartContext";

describe("shop page tests", () => {
  it("renders product card", () => {
    const testItem = {
      category: "test",
      description: "test",
      id: 1,
      imagePath: "test",
      price: 20,
      sold: false,
      user: {
        email: "B@mail.com",
        id: 2,
        password:
          "$2b$10$DmTjWlA2SbxfezidRRQLluCf4ITZkX.ayyQD7Y6taxrVcajK1tMca",
        username: "Birry",
      },
      userId: 2,
    };

    render(
      <BrowserRouter>
        <CartProvider>
          <ItemsProvider>
            <ProductCard item={testItem} />
          </ItemsProvider>
        </CartProvider>
      </BrowserRouter>
    );
  });
});
