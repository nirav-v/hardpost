import { Link } from "react-router-dom";
import hardpostLogo from "../../images/hardpost-logo.png";

import React from "react";

function Header() {
  return (
    <div>
      <Link to="/">
        {" "}
        <img src={hardpostLogo} />
      </Link>
      ;
    </div>
  );
}

export default Header;
