import { WorkflowRegistrationContext } from '@hiobairo/app-core/src/@types/CoreModuleTypes';
import Settings from './Settings';

function register({
  registerMenus,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {

  registerMenus([])

  registerRoutes([
    {
      path: 'settings/*',
      element: <Settings />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])
}

const SettingsModule = {
  register,
}

export default SettingsModule;