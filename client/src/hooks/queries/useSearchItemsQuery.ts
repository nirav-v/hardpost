import { useQuery } from '@tanstack/react-query';
import { Item } from '../../types/ItemTypes';
import { shopApi } from '../../api/shopApi';

export const useSearchItemsQuery = (searchTerm: string | null) => {
  return useQuery<Item[]>({
    queryKey: ['searchItems'],
    queryFn: () => shopApi.getItemBySearch(searchTerm),
    // if the search term we pass is falsy (e.g. )
    enabled: !!searchTerm,
  });
};
