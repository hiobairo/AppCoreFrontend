import { useMutation, useQuery } from '@tanstack/react-query';
import { createRole, editRole, list, roleById, GetRolesParamsType } from './actions';
import { RoleType } from '@hiobairo/app-core';

export function useRoles(params: GetRolesParamsType) {
  return useQuery({
    queryKey: ['role-list'],
    queryFn: () => list(params),
  });
}

export function useRoleById(id: number) {
  return useQuery({
    queryKey: ['role-by-id'],
    queryFn: () => roleById(id),
  });
}

export function useCreateRole() {
  return useMutation({
    mutationKey: ['create-role'],
    mutationFn: (persmission: RoleType) => createRole(persmission),
  });
}

export function useEditRole() {
  return useMutation({
    mutationKey: ['edit-role'],
    mutationFn: (persmission: RoleType) => editRole(persmission),
  });
}