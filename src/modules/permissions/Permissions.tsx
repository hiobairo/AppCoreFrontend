import { useNavigate } from 'react-router-dom';
import { Box, Card, FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography, TextField, Tab, Tabs, Divider, Switch } from '@mui/material';
import { useEffect } from 'react';
import { RoleClaimType, RoleType, checkValidPermission, localization, useObjectState } from '@hiobairo/app-core';
import { useCreateRole, useEditRole, useRoles } from './api/roles';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { SITE_NAME } from '../../config';
import { DASHBOARD_ROUTES } from '../../routes';
import TitleWithAddButton from '../../components/title-with-add-button/TitleWithAddButton';
import React from 'react';
import _ from 'lodash';
import NoDataContent from '../../components/no-data-content/NoDataContent';
import ActionButtons from '../../components/action-buttons/ActionButtons';
import { useActions } from './api/actions';
import { permissions as permissionsForActions } from './constants';
import Iconify from '../../components/iconify/Iconify';
import { uuidv4 } from '../../utils/global';

export const metadata = { title: `Customers | Dashboard | ${SITE_NAME}` };

type PermissionsStateType = {
  selectedRole: RoleType | null;
  selectedGroupIndex: number;
  selectedPermissionId: number | string | null;
  newRoleName: string;
  newRoleDescription: string;
  showCreateNewRoleForm: boolean;
}

export default function Permissions(): JSX.Element {
  const navigate = useNavigate();
  const [{
    selectedRole,
    selectedGroupIndex,
    selectedPermissionId,
    newRoleName,
    newRoleDescription,
    showCreateNewRoleForm,
  }, updateState] = useObjectState<PermissionsStateType>({
    newRoleName: '',
    newRoleDescription: '',
    selectedGroupIndex: 0,
    selectedRole: null,
    selectedPermissionId: null,
    showCreateNewRoleForm: false,
  });
  const { mutateAsync: createRole, isPending } = useCreateRole();
  const { mutateAsync: editRole } = useEditRole();
  const { data, isFetching, refetch } = useRoles({
    pagination: { skip: 0, take: 1000 },
  });
  const { data: actionsData } = useActions({ skip: 0, take: 1000 });
  const roles = data?.items ?? [];
  const actions = actionsData?.items ?? [];
  const permissions = actions;


  useEffect(() => {
    refetch();
  }, [refetch]);

  const onCreateNewRole = () => {
    if (newRoleName) {
      createRole({
        name: newRoleName, description: newRoleDescription, roleClaims: [],
        id: '',
        actions: [],
        active: false
      }).then(() => {
        updateState({ newRoleName: '', newRoleDescription: '', showCreateNewRoleForm: false });
        refetch();
      });
    }
  }

  const onUpdateRole = () => {
    if (selectedRole) {
      editRole({
        id: selectedRole.id,
        name: selectedRole.name,
        active: selectedRole.active,
        roleClaims: selectedRole.roleClaims.map((roleClaim: RoleClaimType) => ({
          id: roleClaim.id,
          permissionId: roleClaim.permission?.id,
          roleId: selectedRole?.id,
          actions: roleClaim.actions?.map((action) => ({
            id: action.id,
            actionId: action.action?.id,
            permissionRoleId: action.permissionRole?.id,
          })),
        }))
      }).then(() => {
        refetch();
      });
    }
  }

  return (
    <>
      <BreadCrumbs
        items={[
          {
            name: localization.localize('general.permissions'),
            url: DASHBOARD_ROUTES.PERMISSIONS.LIST,
            icon: '',
          },
          {
            name: localization.localize('general.list'),
            url: '',
            icon: ''
          },
        ]}
      />
      <Card>
        <Stack sx={{ mb: 5 }} direction="row" spacing={3}>
          <Stack direction={'row'} spacing={1} sx={{ flex: '1 1 auto' }}>
            <Box>
              <Iconify icon={'mdi:shield-key-outline'} fontSize={40} />
            </Box>
            <Box sx={{ mt: 0.7 }}>
              <Typography sx={{ top: 2 }} variant="h5">{localization.localize('general.permissions')}</Typography>
            </Box>
          </Stack>
        </Stack>
        <Grid container>
          <Grid item xl={3}>
            <Box sx={{ pl: 2, pr: 2 }}>
              <TitleWithAddButton
                title={localization.localize('general.roles')}
                onPressAddButton={() => updateState({ showCreateNewRoleForm: true })}
                showAddButton={checkValidPermission([permissionsForActions.create])}
              />
            </Box>
            <List
              sx={{
                maxHeight: '450px',
                overflowY: 'scroll',
              }}
            >
              {showCreateNewRoleForm && (
              <Stack sx={{ width: '100%', p: 2 }}>
                <Box>
                  <TextField
                    label={localization.localize('general.name')}
                    fullWidth
                    value={newRoleName}
                    onChange={(e) => updateState({ newRoleName: e.target.value })}
                  />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    label={localization.localize('general.description')}
                    fullWidth
                    value={newRoleDescription}
                    onChange={(e) => updateState({ newRoleDescription: e.target.value })}
                  />
                </Box>
                <Box>
                  <ActionButtons
                    leftButtonTitle={localization.localize('general.cancel')}
                    rightButtonTitle={localization.localize('general.create')}
                    onLeftButtonPress={() => updateState({ showCreateNewRoleForm: false })}
                    onRightButtonPress={onCreateNewRole}
                    isLoading={isPending}
                  />
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Stack>)}
              {roles && roles.map(role => (
                <ListItem key={role.id} sx={{ pt: 0, pb: 0 }}>
                  <ListItemButton
                    onClick={() => {
                      updateState({
                        selectedRole: role,
                        selectedGroupIndex: 0,
                        selectedPermissionId: permissions?.[0].id,
                      })
                    }}
                    sx={{
                      borderBottom: '1px color(srgb 0.91 0.91 0.91) solid',
                      border: selectedRole?.id === role.id ? '2px color(srgb 0.3882 0.3569 1) solid' : 'none',
                      borderRadius: '5px',
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: selectedRole?.id === role.id ? 'color(srgb 0.3882 0.3569 1)' : 'black',
                      }}
                      primary={role.name}
                      secondary={
                        <React.Fragment>
                          {role.description}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          {!selectedRole && (
          <Grid item xl={9}>
            <Box justifySelf={'center'} sx={{ mt: 3 }}>
              <NoDataContent display={true} text={localization.localize('permissions.please_select_a_role_to_view_permissions')}  />
            </Box>
          </Grid>)}
          {selectedRole && (
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
            <Grid container sx={{ mt: 2.1 }}>
              <Stack flexDirection='row'>
                <Tabs value={selectedGroupIndex} sx={{ width: '100%' }} variant="scrollable" scrollButtons="auto">
                  {permissions?.map((permission, idx) => (
                    <Tab
                      key={idx}
                      label={permission.name}
                      onClick={() => {
                        updateState({
                          selectedPermissionId: permission.id,
                          selectedGroupIndex: idx,
                        });
                      }}
                      id={`status-tab-${idx}`}
                      {...{
                        'aria-controls': `status-tabpanel-${idx}`,
                      }}
                    />
                  ))}
                </Tabs>
              </Stack>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Stack flexDirection='row' spacing={2} flexWrap={'wrap'}>
                {permissions?.find(i => i.id === selectedPermissionId)?.actions?.map((action) => {
                  const isChecked = selectedRole?.roleClaims?.find(i => i.permission?.id === selectedPermissionId)?.actions?.find(i => i.action.id === action.id);
                  return (
                    <Box
                      key={action?.id}
                      sx={{
                        cursor: 'pointer',
                        width: '220px',
                        padding: 1.4,
                        borderRadius: '5px',
                        boxShadow: '0 8px 20px 0px rgba(0, 0, 0, 0.04),0 0 2px 0px rgba(0, 0, 0, 0.1)',
                        marginLeft: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Stack direction={'row'}>
                        <Box sx={{ mt: 0.8 }}>
                          <FormControlLabel
                            label={''}
                            checked={isChecked ? true : false}
                            onChange={() => {
                              const currentSelectedRole: RoleType = { ...selectedRole };
                              if (isChecked) {
                                currentSelectedRole.roleClaims = currentSelectedRole.roleClaims.map((roleClaim: RoleClaimType) => {
                                  if (roleClaim.permission?.id === selectedPermissionId) {
                                    return {
                                      ...roleClaim,
                                      actions: roleClaim?.actions?.filter(i => i.action.id !== action.id) ?? [],
                                    }
                                  }

                                  return roleClaim;
                                });
                              } else {
                                const existRoleClaimForPermission = currentSelectedRole.roleClaims.find(i => i.permission?.id === selectedPermissionId);
                                if (currentSelectedRole.roleClaims.length > 0 && existRoleClaimForPermission) {
                                  console.log('role claims more than 0')
                                  console.log({
                                    existRoleClaimForPermission,
                                    currentSelectedRole,
                                    selectedPermissionId
                                  })
                                  const newRoleClaims = currentSelectedRole.roleClaims.map((roleClaim: RoleClaimType) => {
                                    if (roleClaim.permission?.id === selectedPermissionId) {
                                      return {
                                        ...roleClaim,
                                        actions: [
                                          ...(roleClaim.actions ?? []),
                                          {
                                            permission: selectedRole?.roleClaims?.find(i => i.permission?.id === selectedPermissionId),
                                            action,
                                          }
                                        ]
                                      }
                                    }

                                    return roleClaim;
                                  });

                                  currentSelectedRole.roleClaims = newRoleClaims;
                                } else {
                                  console.log('role claims equals to 0')
                                  const newRoleClaim: RoleClaimType = {
                                    id: uuidv4(),
                                    role: selectedRole,
                                    permission: permissions.find(i => i.id === selectedPermissionId),
                                    actions: [
                                      {
                                        permissionRole: {
                                          role: selectedRole,
                                          permission: selectedRole?.roleClaims?.find(i => i.permission?.id === selectedPermissionId)?.permission,
                                        },
                                        action,
                                      }
                                    ]
                                  };
                                  currentSelectedRole.roleClaims  = [...currentSelectedRole.roleClaims, newRoleClaim]
                                }
                              }
                              updateState({
                                selectedRole: currentSelectedRole,
                              })
                            }}
                            control={
                              <Switch />
                            }
                          />
                        </Box>
                        <Box>
                          <Typography fontSize={13} variant='subtitle2' fontWeight={'600'} sx={{ mt: 1.8 }}>{action?.name}</Typography>
                        </Box>
                      </Stack>
                    </Box>
                    )
                })}
              </Stack>
            </Grid>
          </Grid>)}
        </Grid>
        <Grid container>
          <Grid item xl={8}></Grid>
          <Grid item xl={4}>
            <ActionButtons
              leftButtonTitle={localization.localize('general.cancel')}
              rightButtonTitle={localization.localize('general.save')}
              onLeftButtonPress={() => navigate(DASHBOARD_ROUTES.PERMISSIONS.LIST)}
              onRightButtonPress={onUpdateRole}
              isLoading={isFetching}
              disabled={isFetching || (!checkValidPermission([permissionsForActions.edit]) && !checkValidPermission([permissionsForActions.create]))}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
