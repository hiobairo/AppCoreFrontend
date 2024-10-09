import { WorkflowRegistrationContext } from '@hiobairo/app-core/src/@types/CoreModuleTypes';
import NotFound from './NotFound';

function register({
  registerMenus,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {

  registerMenus([])

  registerRoutes([
    {
      path: 'not-found',
      element: <NotFound />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])
}

const ProfileModule = {
  register,
}

export default ProfileModule;