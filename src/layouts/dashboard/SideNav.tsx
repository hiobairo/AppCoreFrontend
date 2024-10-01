import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DASHBOARD_ROUTES } from '../../routes';
import { isNavItemActive } from './utils';
import { GetNavConfig } from './navConfig';
import Iconify from '../../components/iconify/Iconify';
import { NavListProps, Section } from '@hiobairo/app-core';

export function SideNav(): React.JSX.Element {
  const { pathname } = useLocation();
  const menuItems = GetNavConfig();

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        // left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        // top: 0,
        // margin: 2,
        // borderRadius: 2,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
        overflowX: 'auto',
        padding: 2,
        boxShadow: '0 5px 23px 0px rgba(0, 0, 0, 0.04),0 0 9px 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={Link} href={DASHBOARD_ROUTES.ROOT} sx={{ display: 'inline-flex' }}>
          <Typography variant='h4' color='white'>App Core</Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {<RenderNavItems pathname={pathname} items={menuItems} />}
      </Box>
    </Box>
  );
}

function RenderNavItems({ items = [], pathname }: { items?: Section[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: Section): React.ReactNode[] => {
    const { subheader, items } = curr;

    acc.push(<NavItem key={subheader} subheader={subheader} pathname={pathname} items={items} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      <Box
        sx={{
          height: '70%'
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}


interface NavItemProps {
  pathname: string;
  items: NavListProps[];
  subheader: string;
}

function NavItem({ items, subheader, pathname }: NavItemProps): React.JSX.Element {
  return (
    <li>
      <Box>
        <List sx={{ flex: '1 1 auto' }}>
          <Box
            component="span"
          >
            <Typography sx={{ color: 'rgb(72, 78, 96)', fontSize: '14px', fontWeight: '600', lineHeight: '32px' }}>
              {subheader}
            </Typography>
          </Box>
          {items?.map(({ title: subMenuTitle, href, icon, matcher, disabled, external }) => {
            const active = isNavItemActive({ disabled, external, href, matcher, pathname });
            return (
              <List key={subMenuTitle} sx={{ mb: 0 }}>
                <Link
                  {...(href
                    ? {
                        component: external ? 'a' : Link,
                        href,
                        target: external ? '_blank' : undefined,
                        rel: external ? 'noreferrer' : undefined,
                      }
                    : { role: 'button' })}
                  sx={{
                    alignItems: 'center',
                    borderRadius: '10px',
                    color: 'var(--NavItem-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    p: '5px 5px',
                    position: 'relative',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    ...(disabled && {
                      bgcolor: 'var(--NavItem-disabled-background)',
                      color: 'var(--NavItem-disabled-color)',
                      cursor: 'not-allowed',
                    }),
                    ...(active && { padding: '15px 15px', borderLeftColor: 'red', bgcolor: 'color(srgb 1 1 1 / 0.24)', color: 'var(--NavItem-active-color)' }),
                  }}
                >
                  <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                  {icon ? (
                    <Iconify
                      fontSize={20}
                      icon={icon}
                      sx={{
                        mr: 2
                      }}
                    />
                  ) : null}
                </Box>
                  <Typography color='rgb(218, 218, 218)' variant='body1' fontSize={'15px'}>
                    {subMenuTitle}
                  </Typography>
                </Link>
              </List>
            )
          })}

        </List>
      </Box>
    </li>
  );
}
