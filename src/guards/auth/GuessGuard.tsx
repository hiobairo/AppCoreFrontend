import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// hooks
import { useAuth } from '@hiobairo/app-core';
// routes
import { DASHBOARD_ROUTES } from '../../routes';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={DASHBOARD_ROUTES.ROOT} />;
  }

  return <>{children}</>;
}
