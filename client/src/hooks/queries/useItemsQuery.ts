import { useQuery } from '@tanstack/react-query';
import { Item } from '../../types/ItemTypes';
import { shopApi } from '../../api/shopApi';

export const useItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: shopApi.getAllItems,
  });
};
