import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Container,
  Center,
  Box,
} from "@chakra-ui/react";
import hardpostLogo from "../../images/hardpost-logo.png";

function NavBar({ loggedIn, handleLogoutClick }) {
  const [currentPage, setCurrentPage] = useState("Home");

  let navTabs = [];
  if (loggedIn) {
    navTabs = [
      { title: "Home", path: "/" },
      { title: "Post Item", path: "/add-item" },
      { title: "Cart", path: "/cart" },
      { title: "My Orders", path: "/orders" },
    ];
  } else {
    navTabs = [{ title: "Home", path: "/" }];
  }

  return (
    <div position="relative">
      {loggedIn ? (
        <Box position="absolute" right="0">
          {" "}
          <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
        </Box>
      ) : null}
      <Container centerContent>
        <Image src={hardpostLogo} alt="hardpost-logo" borderRadius="full" />
        <Breadcrumb separator="-">
          {navTabs.map((tab, i) => (
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
      </Container>
    </div>
  );
}

export default NavBar;
