import { Item } from '../types/ItemTypes';
import { shopApi } from '../api/shopApi';
import { useQuery } from '@tanstack/react-query';

export const useItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: shopApi.getAllItems,
  });
};
