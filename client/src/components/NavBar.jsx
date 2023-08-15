import React from "react";
import { Link } from "react-router-dom";
import hardpostLogo from "../images/hardpost-logo.png";

function NavBar({ loggedIn }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              {" "}
              <img src={hardpostLogo} />
            </Link>
          </li>
          {loggedIn ? (
            <>
              <li>
                <Link to="/add-item">Post Item</Link>
              </li>
              <li>
                <Link to="/orders">My Orders</Link>
              </li>
              <li>
                <Link to="/user-items">My Items</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </>
          ) : (
            <h1>must have an account to buy and post items</h1>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
