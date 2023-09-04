import { Link } from "react-router-dom";
import hardpostLogo from "../../images/hardpost-logo.png";
import "../../styles/header.css";
import React from "react";

function Header() {
  return (
    <Link to="/">
      <header className="header"></header>
    </Link>
  );
}

export default Header;
