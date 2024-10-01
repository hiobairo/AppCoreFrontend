import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiTextField = {
  styleOverrides: {
    root: { borderRadius: '5px', bgcolor: 'rgb(246, 246, 246)' },
  },
} satisfies Components<Theme>['MuiTextField'];
