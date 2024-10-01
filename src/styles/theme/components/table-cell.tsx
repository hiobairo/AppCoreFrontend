import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiTableCell = {
  styleOverrides: {
    root: {
      color: '#2c3e50',
      fontWeight: '500',
      padding: '20px',
      borderBottomColor: 'color(srgb 0.9263 0.9352 0.95)',
      borderButtonWidth: '1px',
    },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
} satisfies Components<Theme>['MuiTableCell'];
