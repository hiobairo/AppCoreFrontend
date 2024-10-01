import { WorkflowRegistrationContext } from '@hiobairo/app-core';
import { DASHBOARD_ROUTES } from '../../routes';
import { permissions } from './constants';
import Users from './Users';
import { localization } from '@hiobairo/app-core';

function register({
  logger,
  registerMenus,
  registerMenuForSection,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {
  logger.debug("Loading USERS module");
  registerMenuForSection(
    permissions.menu,
    {
      title: localization.localize('users.users'),
      href: DASHBOARD_ROUTES.USERS.LIST,
      icon: 'majesticons:users-line',
      matcher: { type: 'startsWith', href: DASHBOARD_ROUTES.USERS.ROOT },
      key: 'users',
      order: 1,
    },
    'administration'
  );

  registerMenus([])

  registerRoutes([
    {
      path: 'users/*',
      element: <Users />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])

  logger.debug("USERS module loaded");
}

const UsersModule = {
  register,
}

export default UsersModule;