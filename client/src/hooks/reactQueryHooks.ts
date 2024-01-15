import { Item } from '../types/ItemTypes';
import { shopApi } from '../api/shopApi';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { ordersApi } from '../api/ordersApi';
import { Order } from '../types/OrderType';

export const useItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: shopApi.getAllItems,
  });
};

export const useUserItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['userItems'],
    queryFn: userApi.getUserItems,
  });
};

export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: ordersApi.getAllOrders,
  });
};
