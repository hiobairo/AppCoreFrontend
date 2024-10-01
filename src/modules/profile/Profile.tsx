import { Avatar, Box, Button, Card, Divider, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Tab, Tabs, Typography } from "@mui/material";
import TitleWithAddButton from "../../components/title-with-add-button/TitleWithAddButton";
import { RHFTextField, RHFFormProvider } from "../../components/hook-form";
import Iconify from "../../components/iconify/Iconify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { localization, RoleType, useAuth, useObjectState } from "@hiobairo/app-core";
import { useForm } from "react-hook-form";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import ActionButtons from "../../components/action-buttons/ActionButtons";
import React from "react";
import AddEntityModalContainer from "../../components/add-entity-modal-container/AddEntityModalContainer";
import { useEditUser, useUserById } from "../users/api/users";
import { AuthUserExpandedType } from "../users/@types/AuthUserExpandedType";
import ChangePasswordForm from "../users/ChangePasswordForm";

type ProfileFormType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const UserFormSchema = Yup.object().shape({
  username: Yup.string().required('El campo "nombre de usuario" es requerido'),
  firstName: Yup.string().required('El campo "primer nombre" es requerido'),
  lastName: Yup.string().required('El campo "apellido" es requerido'),
  email: Yup.string().required('El campo "email" es requerido'),
  phoneNumber: Yup.string().required('El campo "teléfono" es requerido'),
  address: Yup.string().required('El campo "dirección" es requerido'),
});

const resolver = yupResolver(UserFormSchema);

const TAB_VALUES = [
  {
    key: 1,
    value: 0,
    label: localization.localize('profile.personal_information'),
  },
  {
    key: 2,
    value: 1,
    label: localization.localize('profile.change_password'),
  },
];

const Profile = () => {
  const auth = useAuth();
  const authUser = auth.getCurrentUser();
  const { data } = useUserById(authUser?.id || '');
  const user = data?.data;

  const [{
    selectedRole,
    selectedGroupIndex,
    showRoleDetailsModal,
    selectedTabIndex,
  }, updateState] = useObjectState<{ selectedRole: RoleType | null; selectedGroupIndex: number; showRoleDetailsModal: boolean; selectedTabIndex: number; }>({
    selectedRole: null,
    selectedGroupIndex: 0,
    showRoleDetailsModal: false,
    selectedTabIndex: 0,
  })

  const { mutateAsync: editUser } = useEditUser();

  const methods = useForm<ProfileFormType>({
    resolver,
    defaultValues: {
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
    }
  })

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = (data: ProfileFormType) => {
    if (!data.username || !data.firstName || !data.lastName || !data.email) {
      return;
    }

    const userPayload: AuthUserExpandedType = {
      id: user?.id ?? '',
      profilePhoto: user?.profilePhoto ?? '',
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      active: user?.active ?? false,
      isDeleted: false,
      userRoles: user?.userRoles ?? [],
    }

    editUser(userPayload)
    .then(() => {
      
    })
  }

  const renderTabs = React.useCallback(
    () => (
      <Tabs value={selectedTabIndex} sx={{ width: '100%' }} variant="scrollable" scrollButtons="auto">
        {TAB_VALUES?.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            onClick={() => {
              updateState({
                selectedTabIndex: tab.key,
              });
            }}
            id={`status-tab-${tab.key}`}
            {...{
              'aria-controls': `status-tabpanel-${tab.key}`,
            }}
          />
        ))}
      </Tabs>
    ),
    [selectedTabIndex, updateState]
  );

  React.useEffect(() => {
    console.log('use effect', {user})
    if (user) {
      methods.setValue('username', user.username);
      methods.setValue('firstName', user.firstName);
      methods.setValue('lastName', user.lastName);
      methods.setValue('email', user.email);
      methods.setValue('phoneNumber', user.phoneNumber);
      methods.setValue('address', user.address);
    } else {
      methods.setValue('username', '');
      methods.setValue('firstName', '');
      methods.setValue('lastName', '');
      methods.setValue('email', '');
      methods.setValue('phoneNumber', '');
      methods.setValue('address', '');
    }
  }, [methods, user])

  console.log({
    user
  })

  return (
    <>
      <BreadCrumbs
        items={[
          {
            name: localization.localize('profile.my_profile'),
            url: '',
            icon: '',
          },
        ]}
      />
      <AddEntityModalContainer
        open={showRoleDetailsModal}
        onClose={() => updateState({ showRoleDetailsModal: false, selectedRole: null, selectedGroupIndex: 0 })}
        sx={{
          width: '63%',
          p: 4,
          height: 'auto'
        }}
      >
        <Grid item xl={9}>
          <Grid container>
            <Stack sx={{ mt: 2, mb: 2 }}>
              <Stack direction={'row'} spacing={1} sx={{ flex: '1 1 auto' }}>
                <Typography variant="h6" fontWeight='bold'>
                  {selectedRole?.name}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid container sx={{ mt: 2.1, overflow: 'hidden' }}>
            <Stack flexDirection='row'>
              <Tabs value={selectedGroupIndex} sx={{ overflowX: 'scroll', width: 'inherit' }} variant="scrollable" scrollButtons="auto">
                {selectedRole?.roleClaims?.map((roleClaims, idx) => (
                  <Tab
                    key={idx}
                    label={roleClaims.permission?.name}
                    onClick={() => {
                      console.log({
                        id: roleClaims.permission?.id
                      })
                      updateState({
                        selectedGroupIndex: idx,
                      });
                    }}
                    // id={`status-tab-${idx}`}
                    // {...{
                    //   'aria-controls': `status-tabpanel-${idx}`,
                    // }}
                  />
                ))}
              </Tabs>
            </Stack>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Stack flexDirection='row' spacing={3} justifyContent={'flex-start'} flexWrap='wrap'>
              {selectedRole?.roleClaims?.[selectedGroupIndex]?.actions?.map((actionValue) => {
                return (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      width: '220px',
                      padding: 1.4,
                      borderRadius: '5px',
                      border: 'solid 1px',
                      borderColor: 'color(srgb 0.7686 0.7686 0.7687)',
                      marginLeft: 1,
                      marginBottom: 1,
                    }}
                  >
                    <Typography textAlign={'center'} fontSize={13} variant='subtitle2' fontWeight={'600'}>{actionValue.action.name}</Typography>
                  </Box>)
                }
              )}
            </Stack>
          </Grid>
        </Grid>
      </AddEntityModalContainer>
      <Stack flexDirection='row' justifyContent='space-between' spacing={3}>
        <Box sx={{ width: '30%' }}>
          <Card>
            <Stack direction="row">
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                <Typography variant="h4">
                  {localization.localize('profile.roles_and_actions')}
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <TitleWithAddButton
                title={localization.localize('general.roles')}
                showAddButton={false}
              />
              <List>
                {user?.userRoles.map(userRole => (
                  <>
                    <ListItem sx={{ pt: 0, pb: 0 }}>
                      <ListItemButton
                        onClick={() => updateState({ selectedRole: userRole.role, showRoleDetailsModal: true })}
                        sx={{
                          borderBottom: '1px color(srgb 0.91 0.91 0.91) solid',
                          border: 'none',
                          borderRadius: '5px',
                        }}
                      >
                        <ListItemText
                          primary={userRole.role?.name}
                          secondary={
                            <React.Fragment>
                              {userRole.role?.description}
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                ))}
              </List>
              <TitleWithAddButton
                title={localization.localize('profile.actions_per_flows')}
                showAddButton={false}
              />
            </Box>
          </Card>
        </Box>
        <Box sx={{ width: '70%' }}>
          <Card sx={{ mb: 3 }}>
            <Stack direction="row">
              <Stack spacing={1}>
                <Typography variant="h4">
                  {localization.localize('profile.profile_configuration')}
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ mt: 2 }}>
              {renderTabs()}
            </Box>
            {selectedTabIndex === 0 && (
            <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container sx={{ mt: 4 }}>
                <Stack direction="row" spacing={3}>
                  <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h5">
                      {localization.localize('profile.my_profile')}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack spacing={3} sx={{ mt: 2 }}>
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
                          // onChange={(event) => updateState({ selectedFile: event.target.files[0], path: event.target.value })}
                        />
                      </Button>
                    </Box>
                  </Stack>
                  <Grid container>
                    <Grid item lg={12}>
                      <Typography variant="h6">{localization.localize('profile.account_information')}</Typography>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="username"
                          label={localization.localize('general.username')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="email"
                          label={localization.localize('general.email')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={12}>
                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </Grid>
                    <Grid item lg={12}>
                      <Typography variant="h6">{localization.localize('profile.personal_information')}</Typography>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="firstName"
                          label={localization.localize('general.firstname')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="secondName"
                          label={localization.localize('general.middlename')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="lastName"
                          label={localization.localize('general.lastname')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="phoneNumber"
                          label={localization.localize('general.phone')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xl={12}>
                      <FormControl fullWidth>
                        <RHFTextField
                          name="address"
                          label={localization.localize('general.address')}
                          sx={{
                            padding: 0.5,
                            mt: 2
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </Grid>
                    <Grid container>
                      <Grid item lg={8} xl={8}></Grid>
                      <Grid item lg={8} xl={4}>
                        <ActionButtons
                          rightButtonType="submit"
                          isLoading={false}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </RHFFormProvider>
            )}
            {selectedTabIndex === 1 && (
            <ChangePasswordForm
              user={user}
              sx={{
                mt: 2,
                pl: 0,
                pr: 0,
                mb: 3
              }}
            />
            )}
          </Card>
        </Box>
      </Stack>
    </>
  );
}

export default Profile;

