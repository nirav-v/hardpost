import { useQuery } from '@tanstack/react-query';
import { Item } from '../types/ItemTypes';
import { userApi } from '../api/userApi';
import { User } from '../types/UserType';
import { cartApi } from '../api/cartApi';
import { shopApi } from '../api/shopApi';
import { ordersApi } from '../api/ordersApi';
import { Order } from '../types/OrderType';

// ITEMS
export const useItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: shopApi.getAllItems,
  });
};

export const useSearchItemsQuery = (searchTerm: string | null) => {
  return useQuery<Item[]>({
    queryKey: ['searchItems'],
    queryFn: () => shopApi.getItemBySearch(searchTerm),
    // if the search term we pass is falsy (e.g. )
    enabled: !!searchTerm,
  });
};

// USER
export const useUserItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['userItems'],
    queryFn: userApi.getUserItems,
  });
};

export const useUserProfileQuery = () => {
  return useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: userApi.getProfile,
  });
};

// CART
export const useCartQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['cart'],
    queryFn: cartApi.getCartItems,
    placeholderData: [],
  });
};

// ORDERS
export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: ordersApi.getAllOrders,
  });
};
