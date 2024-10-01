import * as React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import Home from '../../screens/home/Home';

export function HomeLayout(): React.JSX.Element {
  return (
    <Stack justifyContent={'center'} alignSelf={'center'}>
      <Header />
      <Home />
      <Footer />
    </Stack>
  );
}
