import { AppContainerConfig, Launcher } from '@hiobairo/app-core';
import { modules } from '../module.config.ts';
import { BACKEND_NET_API_BASE_URL } from './config';
import en from './locale/lang/en.ts';
import es from './locale/lang/es.ts';
import ApplicationContainer from './ApplicationContainer.tsx';
import { configStore } from '@hiobairo/app-core';

console.log('asd')

const workflowsConfig: AppContainerConfig = {
  hostApi: BACKEND_NET_API_BASE_URL,
  defaultLanguage: configStore.getState().config.defaultLanguage,
  languages: [
    {
      code: 'es',
      lang: es,
    },
    {
      code: 'en',
      lang: en,
    },
  ],
  navigation: [
    {
      order: 0,
      id: 'administration',
      subheader: 'Administración',
      itemsByPermission: {},
    },
    {
      order: 1,
      id: 'workspace',
      subheader: 'Mi Trabajo',
      itemsByPermission: {},
    },
    {
      order: 2,
      id: 'settings',
      subheader: 'Configuraciones',
      itemsByPermission: {},
    },
  ],
  developmentConfig: {
    debugTokenLife: true,
    disableTokenCheck: false,
  },
}

Launcher(ApplicationContainer, modules, workflowsConfig);