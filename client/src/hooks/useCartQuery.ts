import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../api/cartApi';
import { Item } from '../types/ItemTypes';

export const useCartQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['cart'],
    queryFn: cartApi.getCartItems,
    placeholderData: [],
  });
};
