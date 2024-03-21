import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';

// mutation to delete user items from db and refetch afterwards
export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => userApi.deleteUserItem(itemId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
