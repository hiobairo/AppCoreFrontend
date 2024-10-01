import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiAccordion = {
  styleOverrides: {
    root: { boxShadow: 'none' },
  },
} satisfies Components<Theme>['MuiAccordion'];
