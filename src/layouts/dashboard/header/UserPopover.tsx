import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import useAuth from '../../../hooks/useAuth';
import { AuthContext, localization } from '@hiobairo/app-core';
import { DASHBOARD_ROUTES } from '../../../routes';
import Iconify from "../../../components/iconify/Iconify";
import { Stack, IconButton } from '@mui/material';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const authContext = React.useContext(AuthContext);
  const authUser = useAuth().getCurrentUser();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    authContext?.logout();
  }, [authContext]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{authUser?.userName}</Typography>
        <Typography color="text.secondary" variant="body2">
          {authUser?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={Link} href={DASHBOARD_ROUTES.PROFILE.ROOT} onClick={onClose}>
          <ListItemIcon>
            <Iconify icon='eva:person-outline' fontSize={20} />
          </ListItemIcon>
          {localization.localize('general.profile')}
        </MenuItem>
        <MenuItem component={Link} href={DASHBOARD_ROUTES.SETTINGS.ROOT} onClick={onClose}>
          <ListItemIcon>
            <Iconify icon='ic:outline-settings' fontSize={20} />
          </ListItemIcon>
          {localization.localize('menu.settings')}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Iconify icon='material-symbols:logout' fontSize={20} />
          </ListItemIcon>
          {localization.localize('menu.logout')}
        </MenuItem>
      </MenuList>
      <Divider />
      <Stack direction={'row'} sx={{ pr: 2, pl: 2 }}>
        <IconButton
          onClick={() => {
            console.log('clicked es')
            localization.setLanguage('es')
            location.reload();
          }}
        >
          <Iconify
            icon='twemoji:flag-mexico'
          />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log('clicked en')
            localization.setLanguage('en')
            location.reload();
          }}
        >
          <Iconify icon='twemoji:flag-liberia' />
        </IconButton>
      </Stack>
    </Popover>
  );
}
