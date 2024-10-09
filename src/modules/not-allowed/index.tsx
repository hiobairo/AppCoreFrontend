import { WorkflowRegistrationContext } from '@hiobairo/app-core/src/@types/CoreModuleTypes';
import NotAllowed from './NotAllowed';

function register({
  registerMenus,
  registerRoutes,
  registerSettingsMenus,
  registerSettingsRoutes,
}: WorkflowRegistrationContext) {

  registerMenus([])

  registerRoutes([
    {
      path: 'not-allowed',
      element: <NotAllowed />,
    },
  ]);

  registerSettingsMenus([])

  registerSettingsRoutes([])
}

const ProfileModule = {
  register,
}

export default ProfileModule;