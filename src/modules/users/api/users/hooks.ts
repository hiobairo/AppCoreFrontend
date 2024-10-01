import { useQuery, useMutation } from '@tanstack/react-query';
import { userById, list, createUser, editUser, GetUsersParams, deleteUser, changeUserPassword, ChangeUserPasswordType } from './actions';
import { AuthUserExpandedType } from '../../@types/AuthUserExpandedType';

export function useUsers(params: GetUsersParams) {
  return useQuery({
    queryKey: ['users-list'],
    queryFn: () => list(params),
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ['user-by-id'],
    queryFn: () => userById(id),
  });
}

export function useCreateUser() {
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: (user: AuthUserExpandedType) => createUser(user),
  });
}

export function useEditUser() {
  return useMutation({
    mutationKey: ['edit-user'],
    mutationFn: (user: AuthUserExpandedType) => editUser(user),
  });
}

export function useChangeUserPassword() {
  return useMutation({
    mutationKey: ['change-user-password'],
    mutationFn: (data: ChangeUserPasswordType) => changeUserPassword(data),
  });
}


export function useDeleteUser() {
  return useMutation({
    mutationKey: ['edit-user'],
    mutationFn: (id: number) => deleteUser(id),
  });
}