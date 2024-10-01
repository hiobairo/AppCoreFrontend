import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '../../routes';
import { RHFAutocomplete, RHFSwitch, RHFFormProvider, RHFTextField } from '../../components/hook-form';
import ActionButtons from '../../components/action-buttons/ActionButtons';
import { useForm } from 'react-hook-form';
import { Alert, Avatar, Box, Button, Divider, FormControl, Grid, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCreateUser, useEditUser, useUserById } from './api/users';
import { RoleType, UserRoleType } from '@hiobairo/app-core';
import Iconify from '../../components/iconify/Iconify';
import useObjectState from '../../hooks/useObjectState';
import { useRoles } from '../permissions/api/roles';
import { localization }  from '@hiobairo/app-core'
import { AuthUserExpandedType } from './@types/AuthUserExpandedType';

type UserFormType = {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  active: boolean;
}

const UserFormSchema = Yup.object().shape({
  username: Yup.string().required('El campo "nombre de usuario" es requerido'),
  firstName: Yup.string().required('El campo "primer nombre" es requerido'),
  middleName: Yup.string(),
  lastName: Yup.string().required('El campo "apellido" es requerido'),
  email: Yup.string().required('El campo "email" es requerido'),
  password: Yup.string().required('El campo "contrasena" es requerido'),
  confirmPassword: Yup.string().required('El campo "confirmar contrasena" es requerido'),
  phoneNumber: Yup.string().required('El campo "teléfono" es requerido'),
  address: Yup.string().required('El campo "dirección" es requerido'),
  active: Yup.boolean().default(true),
});

const resolver = yupResolver(UserFormSchema);

export default function UserForm(): React.JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: editUser } = useEditUser();
  
  const [{
    selectedTabIndex,
    rolesOptions,
  }, updateState] = useObjectState<{ selectedTabIndex: number; rolesOptions: RoleType[] }>({
    selectedTabIndex: 0,
    rolesOptions: [],
  })

  const { data, isFetching } = useUserById(params?.id ?? '');
  const user = data?.data;

  const methods = useForm<UserFormType>({
    resolver,
    defaultValues: {
      username: user?.username || '',
      firstName: user?.firstName || '',
      middleName: user?.middleName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      password: user?.password || '',
      confirmPassword: user?.password || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      active: user?.active || true,
    }
  })

  const { handleSubmit, formState } = methods;
  const { isSubmitSuccessful, isSubmitting } = formState;

  const { data: rolesResponse } = useRoles({
    pagination: {
      take: 1000,
      skip: 0,
    },
  });

  const roles = rolesResponse?.items ?? [];
  
  const onSubmit = (data: UserFormType) => {
    if (!data.username || !data.firstName || !data.lastName || !data.email) {
      return;
    }

    if (!user?.id) {
      if (!data.password || !data.confirmPassword) {
        return;
      }

      if (data.password !== data.confirmPassword) {
        return;
      }
    } 
    

    const userPayload: AuthUserExpandedType = {
      id: user?.id || 0,
      profilePhoto: user?.profilePhoto ?? '',
      username: data.username,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      address: data.address,
      active: data.active,
      isDeleted: false,
      userRoles: rolesOptions.map((role: RoleType) => ({
        userId: user?.id || 0,
        roleId: role.id,
      })),
    }

    if (!user) {
      createUser(userPayload)
      .then(() => {
        compleateProcess()
      })
    } else {
      editUser(userPayload)
      .then(() => {
        compleateProcess()
      })
    }
  }

  const compleateProcess = () => {
    setTimeout(() => {
      navigate(DASHBOARD_ROUTES.USERS.LIST)
    }, 800)
  }

  React.useEffect(() => {
    if (user) {
      methods.setValue('username', user.username);
      methods.setValue('firstName', user.firstName);
      methods.setValue('middleName', user.middleName);
      methods.setValue('lastName', user.lastName);
      methods.setValue('email', user.email);
      methods.setValue('password', user.password);
      methods.setValue('phoneNumber', user.phoneNumber);
      methods.setValue('address', user.address);
      methods.setValue('active', user.active);

      updateState({
        rolesOptions: user.userRoles.map((i: UserRoleType) => i.role),
      })
    } else {
      methods.setValue('username', '');
      methods.setValue('firstName', '');
      methods.setValue('middleName', '');
      methods.setValue('lastName', '');
      methods.setValue('email', '');
      methods.setValue('password', '');
      methods.setValue('phoneNumber', '');
      methods.setValue('address', '');
      methods.setValue('active', true);
    }
  }, [methods, user])

  const renderUserDataTab = () => (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">
            {user ? localization.localize('general.edit') : localization.localize('general.create')} {localization.localize('general.user')}
          </Typography>
        </Stack>
      </Stack>
      <Stack alignSelf={'center'}>
          <Avatar
            sx={{ width: '100px', height: '100px', alignSelf: 'center' }}
            src='https://media.licdn.com/dms/image/C5603AQHC3Sww28vnBg/profile-displayphoto-shrink_200_200/0/1600223973603?e=2147483647&v=beta&t=eDL0rAyglkt_jFZi9M6ul_quAboMjh1NyfIYbzrpFJk'
          />
        <Box>
          <Button
            variant='outlined'
            component='label'
            color='secondary'
            sx={{ mt: 2, width: 200, alignSelf: 'center' }}
            startIcon={(<Iconify icon='fa:photo' />)}
          >
            Seleccionar foto
            <input
              type='file'
              hidden
            />
          </Button>
        </Box>
      </Stack>
      <Grid container>
        <Grid item lg={12}>
          <Typography variant="h6">{localization.localize('user_form.account_information')}</Typography>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="username"
              label={localization.localize('general.username')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={(user ? true : false) || isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="email"
              label={localization.localize('general.email')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={(user ? true : false) || isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        {!user && (
        <>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <RHFTextField
                name="password"
                label={localization.localize('user_form.password')}
                sx={{
                  padding: 0.5,
                  mt: 2
                }}
                disabled={(user ? true : false) || isSubmitting || isFetching}
              />
            </FormControl>
          </Grid>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <RHFTextField
                name="confirmPassword"
                label={localization.localize('user_form.confirm_password')}
                sx={{
                  padding: 0.5,
                  mt: 2
                }}
                disabled={(user ? true : false) || isSubmitting || isFetching}
              />
            </FormControl>
          </Grid>
        </>
        )}
        <Grid item xl={12} lg={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFAutocomplete
              name="role"
              label={localization.localize('general.role')}
              options={roles} 
              multiple
              value={rolesOptions}
              getOptionLabel={(option) => (option as RoleType).name}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              renderInput={(params) => (<TextField label="Rol" {...params} />)}
              disabled={isSubmitting || isFetching}
              onChange={(_, value) => updateState({ rolesOptions: (value as RoleType[]) })}
            />
          </FormControl>
        </Grid>
        <Grid item xl={12}>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h6">{localization.localize('user_form.personal_information')}</Typography>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="firstName"
              label={localization.localize('general.firstname')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="middleName"
              label={localization.localize('general.middlename')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="lastName"
              label={localization.localize('general.lastname')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="phoneNumber"
              label={localization.localize('general.phone')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={12} lg={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="address"
              label={localization.localize('general.address')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFSwitch
              name="active"
              label={localization.localize('general.active')}
              sx={{
                padding: 0.5,
                mt: 2.8
              }}
              disabled={isSubmitting || isFetching}
            />
          </FormControl>
        </Grid>
      </Grid>
      {isSubmitSuccessful && (
        <Alert sx={{ mt: 2 }} severity="success">Datos guardados correctamente</Alert>
      )}
    </Stack>
  )

  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      
      <Box sx={{ pr: 3, pl: 3, overflowX: 'scroll', height: '100%' }}>
        {selectedTabIndex === 0 && renderUserDataTab()}
      </Box>
      <Stack sx={{ alignItems: 'flex-end',  borderTop: 'solid 1px color(srgb 0.8823 0.8824 0.8824)' }}>
        <Box sx={{ width: '300px', pr: 3, pl: 3 }}>
          <ActionButtons
            leftButtonTitle={localization.localize('general.cancel')}
            rightButtonTitle={localization.localize('general.save')}
            rightButtonType='submit'
            onLeftButtonPress={() => navigate(DASHBOARD_ROUTES.USERS.LIST)}
            isLoading={isFetching}
            disabled={isSubmitting || isFetching}
          />
        </Box>
      </Stack>
    </RHFFormProvider>
  );
}
