import { ApiSingleResponseType, RoleType } from '@hiobairo/app-core';
import { ApiResponseType, PaginationType, getClient } from '@hiobairo/app-core';

export type GetRolesParamsType = {
  name?: string;
  pagination?: PaginationType;
}

export const list = async ({
  name,
  pagination,
}: GetRolesParamsType) => {
  const axios = getClient();
  let url = '/Role/GetRoles?';

  if (pagination?.skip) {
    url += `&CurrentPage=${pagination.skip}`;
  }

  if (pagination?.take) {
    url += `&ItemPerPage=${pagination.take}`;
  }

  if (name) {
    url += `&Name=${name}`;
  }

  const { data } = await axios.get<ApiResponseType<RoleType>>(url);

  return data;
}

export const roleById = async (id: number) => {
  const axios = getClient();
  if (isNaN(id)) return Promise.resolve<ApiResponseType<RoleType>>({ items: [], result: { count: 0, success: true  } });

  const { data } = await axios.get<ApiSingleResponseType<RoleType>>(`/Role/GetRoleById/${id}`);

  return data;
}

export const createRole = async (step: RoleType) => {
  const axios = getClient();
  const { data } = await axios.post<ApiResponseType<RoleType>>(`/Role/CreateRole`, step);

  return data;
}

export const editRole = async (role: RoleType) => {
  const axios = getClient();
  const { data } = await axios.patch<ApiResponseType<RoleType>>(`/Role/EditRole/${role.id}`, role);

  return data;
}