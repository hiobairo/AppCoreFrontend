import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        borderBottomColor: 'color(srgb 0.9263 0.9352 0.95)',
        color: '#2c3e50',
        lineHeight: 1,
        borderBottomWidth: '1px',
        borderRadius: '5px',
        paddingTop: 20,
        paddingBottom: 20,
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
