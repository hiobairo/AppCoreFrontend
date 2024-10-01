import { useMemo } from 'react';
import { Menu, MenuItem, Typography, IconButton, Stack } from '@mui/material';
import Iconify from '../iconify/Iconify';
import { usePopupState, bindTrigger, bindMenu, PopupState } from 'material-ui-popup-state/hooks';

export type ContextMenuItemType<T> = {
  id?: string;
  label: string;
  icon: string;
  onPress?: (entity: T, triggers: PopupState) => void;
  visible?: (entity: T) => boolean;
  disabled?: boolean | ((entity: T) => boolean);
};

type ContextMenuItemProps<T> = {
  icon?: string;
  entity: T;
  color?: string;
  items: ContextMenuItemType<T>[];
};

function EntityContextMenu<T>({ icon = 'solar:menu-dots-bold', items, entity, color = '#637381' }: ContextMenuItemProps<T>) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'add-entity-modal' });
  const triggers = useMemo(() => bindTrigger(popupState), [popupState]);

  return (
    <>
      <IconButton {...triggers}>
        <Iconify color={color} icon={icon} />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items
          .filter((item) => (item.visible ? item.visible(entity) : true))
          .map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                item.onPress?.(entity, popupState);
                popupState.close();
              }}
              disabled={typeof item.disabled === 'function' ? item.disabled?.(entity) : item.disabled}
              sx={{
                pr: 2,
                pl: 2
              }}
            >
              <Stack direction="row" spacing={2}>
                <Iconify icon={item.icon} />
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default EntityContextMenu;
