import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
// pages
import Login from '../../screens/login/Login';

import { CircularProgress, Stack, Box } from '@mui/material';
import { useAuth } from '@hiobairo/app-core';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, validateAppToken } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return (
      <Stack justifyContent='center' sx={{ width: '100%' }} >
        <Box alignSelf={'center'} sx={{ marginTop: 20 }}>
          <CircularProgress size={60} />
        </Box>
      </Stack>
    );
  }

  if (!isAuthenticated && !validateAppToken()) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
