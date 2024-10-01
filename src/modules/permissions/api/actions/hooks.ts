import { useMutation, useQuery } from '@tanstack/react-query';
import { createAction, editAction, list, actionById } from './actions';
import { PaginationType } from '@hiobairo/app-core';
import { PermissionType } from '@hiobairo/app-core/src/@types/PermissionType';

export function useActions(pagination: PaginationType) {
  return useQuery({
    queryKey: ['action-list'],
    queryFn: () => list(pagination),
  });
}

export function useActionById(id: number) {
  return useQuery({
    queryKey: ['action-by-id'],
    queryFn: () => actionById(id),
  });
}

export function useCreateAction() {
  return useMutation({
    mutationKey: ['create-action'],
    mutationFn: (action: PermissionType) => createAction(action),
  });
}

export function useEditAction() {
  return useMutation({
    mutationKey: ['edit-action'],
    mutationFn: (action: PermissionType) => editAction(action),
  });
}