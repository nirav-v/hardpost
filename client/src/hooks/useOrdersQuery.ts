import { useQuery } from '@tanstack/react-query';
import { Order } from '../types/OrderType';
import { ordersApi } from '../api/ordersApi';

export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: ordersApi.getAllOrders,
  });
};
