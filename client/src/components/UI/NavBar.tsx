import { Link } from 'react-router-dom';
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
  Text,
  Badge,
  Tag,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import darkModeLogo from '../../images/Hardpost-logos_transparent.png';
import lightModeLogo from '../../images/Hardpost-logos_black.png';
import { useCartContext } from '../../context/CartContext';
import ColorModeBtn from '../buttons/ColorModeBtn';
import LogoutButton from '../buttons/LogoutButton';
import LoginModal from '../modals/LoginModal';
import { FaShoppingCart } from 'react-icons/fa';

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link to={to} data-cy={`${to}-navtab`}>
      <Box
        fontWeight="bold"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}>
        {children}
      </Box>
    </Link>
  );
};

type NavBarProps = {
  loggedIn: boolean;
};

function NavBar({ loggedIn }: NavBarProps) {
  const logoImage = useColorModeValue(lightModeLogo, darkModeLogo);
  const [cart, setCart] = useCartContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let navTabs = [
    // { title: 'Home', path: '/' },
    { title: 'Post Item', path: '/add-item' },
    { title: 'My items', path: '/user-items' },
    { title: 'My Orders', path: '/orders' },
  ];

  const cartNavLink = (
    <NavLink to="/cart">
      <Box display={'flex'} justifyContent="space-evenly">
        <Text p={1}>
          <FaShoppingCart />
        </Text>
        <Text fontSize={'15px'} pt={0}>
          <Tag>{cart.length} items in cart</Tag>
        </Text>
      </Box>
    </NavLink>
  );

  return (
    <>
      <Flex justifyContent="right" mr={2}>
        <ColorModeBtn />
        {/* login button */}
        <LoginModal />
        {/* conditionally render log out button */}
        <LogoutButton>Logout</LogoutButton>
      </Flex>
      <Box px={4}>
        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={['column', 'column', 'row']}>
          {' '}
          <Box className="logo-container" m={4}>
            <Link to={'/'}>
              <Image
                src={logoImage}
                alt="hardpost-logo"
                h="175px"
                borderRadius="full"
              />
            </Link>
          </Box>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            {/* sm screen nav toggle buttton */}
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            {/* md + screen navbar */}
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {navTabs.map(tab => (
                  <NavLink to={tab.path} key={tab.title}>
                    {tab.title}
                  </NavLink>
                ))}
                {cartNavLink}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}></MenuButton>
              </Menu>
            </Flex>
          </Flex>
        </Box>{' '}
        {/* sm screen navbar */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} alignItems={'center'}>
              {navTabs.map(tab => (
                <NavLink to={tab.path} key={tab.title}>
                  {tab.title}
                </NavLink>
              ))}
              {cartNavLink}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default NavBar;
