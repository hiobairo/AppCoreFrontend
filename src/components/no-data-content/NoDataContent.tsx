import { Alert, Box, Grid, Stack, Typography } from "@mui/material"
import Iconify from "../iconify/Iconify";

const NoDataContent = ({
  display,
  text
}: { display: boolean, text?: string }) => (
  display && (
    <Stack justifyContent={'center'} alignItems="center" sx={{ padding: 3 }}>
      <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Iconify icon='fluent:document-none-24-regular' fontSize={80} />
        <Alert severity="info" style={{ textAlign: 'center', mt: '20px' }}>{text ?? 'No hay registros. Puedes agregar uno nuevo con el botón de +'}</Alert>
      </Box>
    </Stack>
  )
);

export default NoDataContent;
