import React, { useState } from "react";
import LogoutButton from "../buttons/LogoutButton";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Container,
  Flex,
  Avatar,
  HStack,
  Text,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import hardpostLogo from "../../images/hardpost-logo.png";
import { useCartContext } from "../../context/CartContext";

const NavLink = ({ children }) => {
  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}>
      {children}
    </Box>
  );
};

function NavBar({ loggedIn, handleLogoutClick }) {
  const [cart, setCart] = useCartContext();

  let navTabs = [{ title: "Home", path: "/" }];
  if (loggedIn) {
    navTabs = [
      { title: "Home", path: "/" },
      { title: "Post Item", path: "/add-item" },
      { title: "My items", path: "/user-items" },
      { title: "My Orders", path: "/orders" },
    ];
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  // if (!loggedIn) {
  //   return (
  //     <Container centerContent>
  //       {" "}
  //       <Link to={"/"}>
  //         <Image src={hardpostLogo} alt="hardpost-logo" borderRadius="full" />
  //       </Link>
  //       <NavLink>
  //         <Link to="/cart">Cart: {cart.length} items</Link>
  //       </NavLink>
  //       <NavLink>
  //         <Link to="/">Home</Link>
  //       </NavLink>
  //     </Container>
  //   );
  // }

  return (
    <>
      <Box px={4}>
        <Container centerContent>
          {" "}
          <Link to={"/"}>
            <Image src={hardpostLogo} alt="hardpost-logo" borderRadius="full" />
          </Link>
        </Container>{" "}
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}>
              {navTabs.map((tab) => (
                <NavLink key={tab.title}>
                  <Link to={tab.path}>{tab.title}</Link>
                </NavLink>
              ))}
              <NavLink>
                <Link to="/cart">Cart: {cart.length} items</Link>
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}></MenuButton>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navTabs.map((tab) => (
                <NavLink key={tab.title}>
                  <Link to={tab.path}>{tab.title}</Link>
                </NavLink>
              ))}
              <NavLink>
                <Link to="/cart">Cart: {cart.length} items</Link>
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );

  // return (
  //   <div position="relative">
  //     {loggedIn ? (
  //       <Box position="absolute" right="0">
  //         {" "}
  //         <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
  //       </Box>
  //     ) : null}
  //     <Container centerContent>
  //       <Image src={hardpostLogo} alt="hardpost-logo" borderRadius="full" />
  //       <Breadcrumb separator="-">
  //         {navTabs.map((tab, i) => (
  //           <BreadcrumbItem
  //             key={i}
  //             onClick={() => setCurrentPage(tab.title)}
  //             isCurrentPage={currentPage === tab.title}>
  //             <BreadcrumbLink as={Link} to={tab.path}>
  //               {tab.title}
  //             </BreadcrumbLink>
  //           </BreadcrumbItem>
  //         ))}
  //       </Breadcrumb>
  //     </Container>
  //   </div>
  // );
}

export default NavBar;
