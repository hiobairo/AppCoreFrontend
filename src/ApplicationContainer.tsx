import { ThemeProvider } from './contexts/theme/ThemeProvider.tsx';
import {AppCoreContainer } from '@hiobairo/app-core';
import App from './App.tsx';

const ApplicationContainer = () => (
  <AppCoreContainer>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AppCoreContainer>
);

export default ApplicationContainer;
