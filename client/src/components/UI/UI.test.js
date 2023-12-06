import ButtonModal from "../modals/ButtonModal";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "../../context/CartContext";
import NavBar from "./NavBar";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../../pages/ShopPage/ProductCard";
import { ItemsProvider } from "../../context/ItemsContext";

describe("App", () => {
  it("renders headline", () => {
    render(<ButtonModal />);
  });

  it("renders navbar ", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <NavBar />
        </CartProvider>
      </BrowserRouter>
    );
  });
});
