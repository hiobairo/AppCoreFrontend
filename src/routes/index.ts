export const DASHBOARD_ROUTES = {
  ROOT: '/admin',
  AUTH: {
    LOGIN: '/admin/auth/login',
  },
  NOTALLOWED: '/admin/not-allowed',
  NOTFOUND: '/admin/not-found',
  PERMISSIONS: {
    ROOT: '/admin/permissions',
    LIST: '/admin/permissions/list',
    ADD: '/admin/permissions/add',
    EDIT: (id: number) => `/admin/permissions/edit/${id}`,
  },
  USERS: {
    ROOT: '/admin/users',
    LIST: '/admin/users/list',
    ADD: '/admin/users/add',
    EDIT: (id: number) => `/admin/users/edit/${id}`,
    CHANGEPASSWORD: (id: string | number) => `/admin/users/change-password/${id}`,
  },
  PROFILE: {
    ROOT: '/admin/profile',
  },
  // settings routes
  SETTINGS: {
    ROOT: '/admin/settings',
  },
}