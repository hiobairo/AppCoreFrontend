import { ModuleConfigItem } from '@hiobairo/app-core';

export const modules: ModuleConfigItem[] = [
  // administration
  { 
    name: 'USERS',
    load: () => import('./src/modules/users'),
    dependencies: ['PERMISSIONS'],
  },
  { 
    name: 'PERMISSIONS',
    load: () => import('./src/modules/permissions'),
  },
  { 
    name: 'PROFILE',
    load: () => import('./src/modules/profile'),
    dependencies: ['PERMISSIONS', 'USERS'],
  },
  // settings
  { 
    name: 'SETTINGS',
    load: () => import('./src/modules/settings'),
  },
];
