import { Divider, Grid, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container
      justifyContent={'center'}
      sx={{
        pt: 8,
        pb: 8,
        pl: '100px',
        pr: '100px',
        bgcolor: 'white'
      }}
    >
      <Stack width={'100%'} direction='row' spacing={12}>
        <Stack justifyContent={'space-between'} spacing={2}>
          <Typography variant='h6' sx={{ color: 'rgb(231, 85, 85)' }}>Mapa del sitio</Typography>
          <Typography variant='body1'>Inicio</Typography>
          <Typography variant='body1'>Solicitar</Typography>
          <Typography variant='body1'>Empresa</Typography>
          <Typography variant='body1'>Afiliate</Typography>
        </Stack>
        <Stack justifyContent={'space-between'} spacing={2}>
          <Typography variant='h6' sx={{ color: 'rgb(231, 85, 85)' }}>Conoce mas</Typography>
          <Typography variant='body1'>Faq</Typography>
          <Typography variant='body1'>Terminos de uso y condiciones</Typography>
          <Typography variant='body1'>Preguntas frecuentes</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant='h6' sx={{ color: 'rgb(231, 85, 85)' }}>Encuentranos en</Typography>
          <Typography variant='body1'>Republica Dominicana</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent={'center'} sx={{ mt: 5 }}>
        <Typography variant='subtitle1'>Copyright © 2024 Repify. Todos los derechos reservados</Typography>
      </Stack>
    </Grid>
  )
}

export default Footer;

