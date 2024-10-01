import { WorkflowRegistrationContext } from '@hiobairo/app-core/src/@types/CoreModuleTypes';
import Permissions from "./Permissions";
import { DASHBOARD_ROUTES } from '../../routes';
import { permissions } from './constants';
import { localization }  from '@hiobairo/app-core'

function register({
  logger,
  registerMenuForSection,
  registerMenus,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {
  logger.debug("Loading PERMISSIONS module");
  registerMenuForSection(
    permissions.menu,
    { 
      title: localization.localize('menu.permissions'),
      href: DASHBOARD_ROUTES.PERMISSIONS.LIST,
      icon: 'mdi:shield-key-outline',
      matcher: { type: 'startsWith', href: DASHBOARD_ROUTES.PERMISSIONS.LIST },
      key: 'permissions',
      order: 0,
    },
    'administration'
  )

  registerMenus([])

  registerRoutes([
    {
      path: 'permissions/*',
      element: <Permissions />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])

  logger.debug("PERMISSIONS module loaded");
}

const PermissionsModule = {
  register,
}

export default PermissionsModule;