import { Card, Box, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify/Iconify";

const NotFound = () => {
  return (
    <Stack flexDirection='row' justifyContent='center' spacing={3} sx={{ height: '100%' }}>
      <Box sx={{ pt: 10, pb: 5 }}>
        <Card sx={{
          width: '100%',
          borderTop: '0px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 20px 0px rgba(0, 0, 0, 0.04),0 0 2px 0px rgba(0, 0, 0, 0.1)',
          padding: 6,
          borderRadius: '10px',
          backgroundColor: 'white',
        }}>
          <Box textAlign={'center'}>
            <Iconify icon='carbon:ibm-cloud-hyper-protect-crypto-services' fontSize={100} sx={{ mb: 3 }} />
          </Box>
          <Box>
            <Typography variant='h4' textAlign={'center'}>Page not found</Typography>
            <Typography variant='subtitle1' textAlign={'center'} sx={{ mt: 2 }} color='#6d7073'>The requested page was not found on the application.</Typography>
            <Typography variant='subtitle1' textAlign={'center'} sx={{ mt: 0.5 }} color='#6d7073'>What are you looking for?.</Typography>
          </Box>
        </Card>
      </Box>
    </Stack>
  );
}

export default NotFound;

