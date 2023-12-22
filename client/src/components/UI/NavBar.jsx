import React, { useState } from "react";
import LogoutButton from "../buttons/LogoutButton";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import darkModeLogo from "../../../public/images/Hardpost-logos_transparent.png";
import lightModeLogo from "../../../public/images/Hardpost-logos_black.png";
import { useCartContext } from "../../context/CartContext";

const NavLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <Box
        fontWeight="bold"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}>
        {children}
      </Box>
    </Link>
  );
};

function NavBar({ loggedIn, handleLogoutClick }) {
  const logoImage = useColorModeValue(lightModeLogo, darkModeLogo);
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

  return (
    <>
      <Box px={4}>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={["column", null, null, null, null, null]}>
          {" "}
          <div className="logo-container">
            <Link to={"/"}>
              <Image
                src={logoImage}
                alt="hardpost-logo"
                h="175px"
                borderRadius="full"
              />
            </Link>
          </div>
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
                  <NavLink to={tab.path} key={tab.title}>
                    {tab.title}
                  </NavLink>
                ))}
                <NavLink to="/cart">Cart: {cart.length} items</NavLink>
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
        </Box>{" "}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navTabs.map((tab) => (
                <NavLink to={tab.path} key={tab.title}>
                  {tab.title}
                </NavLink>
              ))}
              <NavLink to="/cart">Cart: {cart.length} items</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default NavBar;
