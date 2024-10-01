import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiCard = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        margin: '20px 0 10px 0',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: 'none',
        borderTop: '1px solid',
        borderColor: 'color(srgb 0.9263 0.9352 0.95)',
        [`&.${paperClasses.elevation1}`]: {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 5px 22px 0 rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.12)'
              : '0 8px 20px 0px rgba(0, 0, 0, 0.04),0 0 2px 0px rgba(0, 0, 0, 0.1)',
        },
      };
    },
  },
} satisfies Components<Theme>['MuiCard'];
