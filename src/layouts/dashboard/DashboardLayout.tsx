import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Outlet } from 'react-router-dom';
import { MainNav } from './header/MainNav.tsx';
import { SideNav } from './SideNav.tsx';
import { AuthGuard } from '../../guards/auth/AuthGuard.tsx';

export function DashboardLayout(): React.JSX.Element {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <Container sx={{ pt: '25px', pl: 0, pr: 0, pb: 0 }} maxWidth="xl">
            <MainNav />
            <Outlet />
          </Container>
        </Box>
      </Box>
    </AuthGuard>
  );
}
