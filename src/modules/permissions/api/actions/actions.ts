import { ApiResponseType, PaginationType, getClient } from '@hiobairo/app-core';
import { PermissionType } from '@hiobairo/app-core/src/@types/PermissionType';

export const list = async (pagination: PaginationType) => {
  const axios = getClient();
  let url = '/Permission/GetPermissions?';

  if (pagination?.skip) {
    url += `&CurrentPage=${pagination.skip}`;
  }

  if (pagination?.take) {
    url += `&ItemPerPage=${pagination.take}`;
  }

  const { data } = await axios.get<ApiResponseType<PermissionType>>(url);

  return data;
}

export const actionById = async (id: number) => {
  const axios = getClient();
  if (isNaN(id)) return Promise.resolve<ApiResponseType<PermissionType>>({ items: [], result: { count: 0, success: true  } });

  const { data } = await axios.get<ApiResponseType<PermissionType>>(`/Permission/GetPermissions?Id=${id}`);

  return data;
}

export const createAction = async (step: PermissionType) => {
  const axios = getClient();
  const { data } = await axios.post<ApiResponseType<PermissionType>>(`/Permission/CreateAction`, step);

  return data;
}

export const editAction = async (step: PermissionType) => {
  const axios = getClient();
  const { data } = await axios.patch<ApiResponseType<PermissionType>>(`/Permission/EditAction`, step);

  return data;
}