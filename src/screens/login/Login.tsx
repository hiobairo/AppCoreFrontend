import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form"
import { RHFCheckbox, RHFTextField, RHFFormProvider } from '../../components/hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '@hiobairo/app-core';
import { Alert, CircularProgress } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type LoginFormType = {
  email: string;
  password: string;
}

export default function Login() {
  const methods = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');
  const { handleSubmit } = methods;
  const authContext = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    setIsLoading(true)
    if (data.email === '' || data.password === '') {
      setIsError('Usuario y contraseña son requeridos')
      setIsLoading(false)
      return;
    }
    authContext?.login(data.email, data.password)
      .catch((error) => {
        setIsLoading(false)
        setIsError('Usuario o contraseña incorrectos')
        console.error(error);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 20px 0px rgba(0, 0, 0, 0.04),0 0 2px 0px rgba(0, 0, 0, 0.1)',
            padding: 6,
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '450px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', alignSelf: 'center' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box sx={{ mb: 2 }}>
            <Typography component="h1" variant="h5" textAlign={'center'}>
              Ingresar a App Core
            </Typography>
          </Box>
          <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Box>
              <RHFTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={isLoading}
              />
              <RHFTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <RHFCheckbox label="Remember me" name="rememberme" value="remember" color="primary" />
              {isError && (
                <Alert sx={{ mt: 2 }} severity="error">{isError}</Alert>
              )}
              
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                disabled={isLoading}
                size="medium"
                style={{ width: '100%', textTransform: 'initial', fontSize: '14px' }}
                variant="contained"
                color="success"
                type='submit'
              >
                {isLoading ? <CircularProgress size={20} /> : 'Ingresar'}
              </Button>
            </Box>
          </RHFFormProvider>
        </Box>
      </Container>
    </ThemeProvider>
  );
}