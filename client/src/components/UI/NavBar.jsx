import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
function NavBar({ loggedIn }) {
  const [currentPage, setCurrentPage] = useState("Home");

  const tabs = [
    { title: "Home", path: "/" },
    { title: "Post Item", path: "/add-item" },
    { title: "My Orders", path: "/orders" },
  ];

  return (
    <Breadcrumb separator="-">
      {tabs.map((tab, i) => (
        <BreadcrumbItem
          key={i}
          onClick={() => setCurrentPage(tab.title)}
          isCurrentPage={currentPage === tab.title}>
          <BreadcrumbLink as={Link} to={tab.path}>
            {tab.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default NavBar;
