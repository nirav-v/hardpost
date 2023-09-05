import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Container,
  Center,
} from "@chakra-ui/react";
import hardpostLogo from "../../images/hardpost-logo.png";

function NavBar({ loggedIn }) {
  const [currentPage, setCurrentPage] = useState("Home");

  const tabs = [
    { title: "Home", path: "/" },
    { title: "Post Item", path: "/add-item" },
    { title: "My Orders", path: "/orders" },
  ];

  return (
    <Container>
      {" "}
      <Image src={hardpostLogo} alt="hardpost-logo" borderRadius="full" />
      <Center>
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
      </Center>
    </Container>
  );
}

export default NavBar;
