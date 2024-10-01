import { WorkflowRegistrationContext } from '@hiobairo/app-core/src/@types/CoreModuleTypes';
import Profile from './Profile';

function register({
  registerMenus,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {

  registerMenus([])

  registerRoutes([
    {
      path: 'profile/*',
      element: <Profile />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])
}

const ProfileModule = {
  register,
}

export default ProfileModule;