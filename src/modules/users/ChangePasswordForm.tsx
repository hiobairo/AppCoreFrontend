import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { RHFFormProvider } from "../../components/hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthUser, localization, RHFTextField } from "@hiobairo/app-core";
import { Alert, Box, FormControl, Grid, Stack, Typography } from "@mui/material";
import ActionButtons from "../../components/action-buttons/ActionButtons";
import { DASHBOARD_ROUTES } from "../../routes";
import { useNavigate, useParams } from "react-router-dom";
import { useUserById } from "./api/users";
import EntityListAvatar from "../../components/entity-list-avatar/EntityListAvatar";
import { ChangeUserPasswordType } from './api/users/actions';
import { useChangeUserPassword } from './api/users/hooks';
import { useQueryClient } from '@tanstack/react-query';

type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
}

const changePasswordShcema = Yup.object().shape({
  oldPassword: Yup.string().required('El campo "Contraseña actual" es requerido'),
  newPassword: Yup.string().required('El campo "Contraseña nueva" es requerido'),
});

const resolver = yupResolver(changePasswordShcema);

export const ChangePasswordForm = ({
  user: userFromProps,
  sx = {},
}: { user?: AuthUser; sx?: any }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const params = useParams();
  const { mutateAsync: changeUserPassword } = useChangeUserPassword();
  const { data, isFetching, refetch: refetchUser } = useUserById(params?.id ?? '');
  const user = { ...userFromProps } && data?.data;

  const methods = useForm<ChangePasswordFormType>({
    resolver,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    }
  })
  
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState; 

  const onSubmit = (data: ChangePasswordFormType) => {
    if (!data.oldPassword || !data.newPassword) {
      return;
    }

    if (!user) {
      return;
    }

    const payload: ChangeUserPasswordType = {
      userName: user?.userName,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }

    changeUserPassword(payload)
    .then(() => {
      compleateProcess();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const compleateProcess = () => {
    queryClient.refetchQueries({
      predicate(query: any) {
        return ['users-list'].includes(
          query.queryKey[0] as string
        );
      },
    });
    setTimeout(() => {
      navigate(DASHBOARD_ROUTES.USERS.LIST)
    }, 800)
  }

  useEffect(() => {
    if (params.id) {
      refetchUser();
    }
  }, [params.id, refetchUser])

  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ pr: 3, pl: 3, overflowX: 'scroll', height: '100%', ...sx }}>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={3}>
            <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
              <Typography variant="h5">
                {localization.localize('users.change_password')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Grid item lg={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            {localization.localize('change_password.make_sure_to_introduce_a_secure_password')}
          </Alert>
        </Grid>
        <Stack direction={'row'} sx={{ p: 1, mt: 2 }}>
          <Box>
            <EntityListAvatar allowUserSelector={false} user={user} />
          </Box>
          <Box sx={{ mt: 1, ml: 1 }}>
            <Typography variant='subtitle1'>{user?.firstName} {user?.lastName}</Typography>
          </Box>
        </Stack>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="oldPassword"
              label={localization.localize('change_password.old_password')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
              type='password'
            />
          </FormControl>
        </Grid>
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <RHFTextField
              name="newPassword"
              label={localization.localize('change_password.new_password')}
              sx={{
                padding: 0.5,
                mt: 2
              }}
              disabled={isSubmitting || isFetching}
              type='password'
            />
          </FormControl>
        </Grid>
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
  )
}

export default ChangePasswordForm;
