import { ApiResponseType } from '../../../../@types/ApiResponseType';
import { ApiSingleResponseType } from '../../../../@types/ApiSingleResponseType';
import { PaginationType } from '../../../../@types/PaginationType';
import { getClient } from '@hiobairo/app-core';
import { AuthUserExpandedType } from '../../@types/AuthUserExpandedType';

export type ChangeUserPasswordType = {
  userName: string;
  oldPassword: string;
  newPassword: string;
}

export type GetUsersParams = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  pagination: PaginationType
}

export const list = async ({
  pagination,
  username,
  firstName,
  lastName,
  email,
}: GetUsersParams) => {
  const axios = getClient();
  let url = '/User/GetUsers?';

  if (pagination?.skip) {
    url += `&currentPage=${pagination.skip}`;
  }

  if (pagination?.take) {
    url += `&itemPerPage=${pagination.take}`;
  }

  if (username) {
    url += `&userName=${username}`;
  }
  
  if (firstName) {
    url += `&firstName=${firstName}`;
  }

  if (lastName) {
    url += `&lastName=${lastName}`;
  }

  if (email) {
    url += `&email=${email}`;
  }

  const { data } = await axios.get<ApiResponseType<AuthUserExpandedType>>(url);

  return data;
}

export const userById = async (id: string) => {
  const axios = getClient();
  if (!id) return Promise.resolve<ApiSingleResponseType<AuthUserExpandedType>>({ items: [], result: { count: 0, success: true  } });

  const { data } = await axios.get<ApiSingleResponseType<AuthUserExpandedType>>(`/User/GetUserById/${id}`);

  return data;
}

export const createUser = async (user: AuthUserExpandedType) => {
  const axios = getClient();
  const { data } = await axios.post<ApiSingleResponseType<AuthUserExpandedType>>(`/User/CreateUser`, user);

  return data;
}

export const editUser = async (user: AuthUserExpandedType) => {
  const axios = getClient();
  const { data } = await axios.patch<ApiSingleResponseType<AuthUserExpandedType>>(`/User/EditUser/${user.id}`, user);

  return data;
}

export const changeUserPassword = async (params: ChangeUserPasswordType) => {
  const axios = getClient();
  const { data } = await axios.post<ApiSingleResponseType<AuthUserExpandedType>>(`/User/ChangePassword`, params);

  return data;
}

export const deleteUser = async (id: number) => {
  const axios = getClient();
  const { data } = await axios.delete<ApiSingleResponseType<AuthUserExpandedType>>(`/User/DeleteUser/${id}`);

  return data;
}