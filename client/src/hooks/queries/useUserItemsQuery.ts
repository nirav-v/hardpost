import { useQuery } from '@tanstack/react-query';
import { Item } from '../../types/ItemTypes';
import { userApi } from '../../api/userApi';

export const useUserItemsQuery = () => {
  return useQuery<Item[]>({
    queryKey: ['userItems'],
    queryFn: userApi.getUserItems,
  });
};
