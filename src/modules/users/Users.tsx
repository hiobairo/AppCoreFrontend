import { JSX, useEffect, useState } from 'react';
import { Box, Button, Card, Chip, Stack, TextField } from '@mui/material';
import { DASHBOARD_ROUTES } from '../../routes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PaginationType } from '@hiobairo/app-core';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import SectionTitle from '../../components/section-title/SectionTitle';
import { DataTable } from '@hiobairo/app-core';
import UserForm from './UserForm';
import AddEntityModalContainer from '../../components/add-entity-modal-container/AddEntityModalContainer';
import { useUsers, useDeleteUser } from './api/users';
import Iconify from '../../components/iconify/Iconify';
import useObjectState from '../../hooks/useObjectState';
import { checkValidPermission, AuthUser } from '@hiobairo/app-core';
import { permissions } from './constants';
import EntityListAvatar from '../../components/entity-list-avatar/EntityListAvatar';
import { formatDate } from '../../utils/global';
import PromptModal from '../../components/prompt-modal/PromptModal';
import { localization }  from '@hiobairo/app-core'
import ChangePasswordForm from './ChangePasswordForm';

export default function Users(): JSX.Element {
  const navigate = useNavigate();
  const [{
    username,
    firstName,
    lastName,
    email,
  }, updateState] = useObjectState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  }) 
  const [pagination, setPagination] = useState<PaginationType>({ skip: 0, take: 10 })
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [entity, setEntity] = useState<number>(0);

  const { mutateAsync: deleteUser } = useDeleteUser();
  const { data, isFetching, refetch } = useUsers({
    username,
    firstName,
    lastName,
    email,
    pagination,
  });
  const users = data?.items ?? [];

  const changePagination = (take: number, skip: number) => {
    setPagination({
      skip,
      take,
    })
  }

  const showDeleteConfirmation = (entity: number) => {
    setShowDeleteConfirmationModal(true);
    setEntity(entity);
  }

  useEffect(() => {
    refetch();
  }, [pagination, refetch])

  return (
    <>
      <PromptModal
        open={showDeleteConfirmationModal}
        onContinuePress={async () => {
          deleteUser(entity).then((response) => {
            console.log(response)
            setShowDeleteConfirmationModal(false);
            setEntity(0);
            refetch();
          }).catch(() => {

          })
        }}
        onCancelPress={() => {
          setShowDeleteConfirmationModal(false);
          setEntity(0);
        }}
        isLoading={false}
        disableButtons={false}
      />
     <Routes>
        {checkValidPermission([permissions.edit]) && (
        <Route
          path="edit/:id"
          element={
            <AddEntityModalContainer
              open={true}
              onClose={() => navigate(DASHBOARD_ROUTES.USERS.LIST)}
              sx={{
                height: '90%',
                width: '40%',
              }}
            >
              <UserForm />
            </AddEntityModalContainer>
          }
        />)}
        {checkValidPermission([permissions.create]) && (
        <Route
          path="add"
          element={
            <AddEntityModalContainer
              open={true}
              onClose={() => navigate(DASHBOARD_ROUTES.USERS.LIST)}
              sx={{
                height: '90%',
                width: '40%',
              }}
            >
              <UserForm />
            </AddEntityModalContainer>
          }
        />)}
        {checkValidPermission([permissions.changePassword]) && (
        <Route
          path="change-password/:id"
          element={
            <AddEntityModalContainer
              open={true}
              onClose={() => navigate(DASHBOARD_ROUTES.USERS.LIST)}
              sx={{
                width: '40%',
                height: 'auto'
              }}
            >
              <ChangePasswordForm sx={{ pb: 2 }} />
            </AddEntityModalContainer>
          }
        />)}
      </Routes>
      <BreadCrumbs
        items={[
          {
            name: localization.localize('users.users'),
            url: DASHBOARD_ROUTES.USERS.LIST,
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
        <Stack direction={'row'} spacing={3} flexWrap={'wrap'}>
          <Box>
            <Iconify icon='bi:filter' fontSize={40} sx={{ mt: 1 }} />
          </Box>
          <Box>
            <TextField
              label={localization.localize('general.username')}
              onChange={(e) => updateState({ username: e.target.value })}
            />
          </Box>
          <Box>
            <TextField
              label={localization.localize('general.firstname')}
              onChange={(e) => updateState({ firstName: e.target.value })}
            />
          </Box>
          <Box>
            <TextField
              label={localization.localize('general.lastname')}
              onChange={(e) => updateState({ lastName: e.target.value })}
            />
          </Box>
          <Box>
            <TextField
              label={localization.localize('general.email')}
              onChange={(e) => updateState({ email: e.target.value })}
            />
          </Box>
          <Box>
            <Button
              variant='contained'
              color='info'
              size='large'
              sx={{
                top: '4px'
              }}
              onClick={() => refetch()}
            >
              {localization.localize('general.apply')}
            </Button>
          </Box>
        </Stack>
      </Card>
      <Card>
        <SectionTitle
          title={localization.localize('users.users')}
          icon='majesticons:users-line'
          addButton={{
            onClick: () => navigate(DASHBOARD_ROUTES.USERS.ADD),
            title: localization.localize('users.add_new_user'),
            icon: 'ant-design:plus-outlined',
            permissions: [permissions.create],
          }}
        />
        <DataTable
          selectable={false}
          columns={[
            {
              header: localization.localize('general.profile'),
              display: true,
              render(entity: AuthUser) {
                return (
                  <EntityListAvatar
                    user={entity}
                  />
                )
              }
            },
            {
              header: localization.localize('general.username'),
              display: true,
              render(entity: AuthUser) {
                return `${entity?.username}`
              }
            },
            {
              header: localization.localize('users.firstname_lastname'),
              display: true,
              render(entity: AuthUser) {
                return `${entity?.firstName} ${entity?.lastName}`
              }
            },
            {
              header: localization.localize('general.email'),
              display: true,
              render(entity: AuthUser) {
                return entity?.email
              }
            },
            {
              header: localization.localize('general.phone'),
              display: true,
              render(entity: AuthUser) {
                return entity?.phoneNumber
              }
            },
            {
              header: localization.localize('general.active'),
              display: true,
              render(entity: AuthUser) {
                return (
                  <Chip
                    label={entity?.active ? localization.localize('general.active') : localization.localize('general.inactive')}
                    color={entity?.active ? 'success' : 'error'}
                  />
                )
              }
            },
            {
              header: localization.localize('general.creation_date'),
              display: true,
              render(entity: AuthUser) {
                return formatDate(entity?.createdDate!)
              }
            },
          ]}
          items={users}
          menuItems={[
            ...(checkValidPermission([permissions.edit]) ? 
              [
                {
                  id: 'edit',
                  label: localization.localize('general.edit'),
                  icon: 'eva:edit-2-outline',
                  onPress: (entity: AuthUser) => {
                    navigate(DASHBOARD_ROUTES.USERS.EDIT(entity?.id));
                  }
                }
              ] : []),
            ...(checkValidPermission([permissions.changePassword]) ? 
              [
                {
                  id: 'change-password',
                  label: localization.localize('users.change_password'),
                  icon: 'mdi:password-check-outline',
                  onPress: (entity: AuthUser) => {
                    navigate(DASHBOARD_ROUTES.USERS.CHANGEPASSWORD(entity?.id));
                  }
                }
              ] : []),
            ...(checkValidPermission([permissions.delete]) ? 
            [
              {
                id: 'delete',
                label: localization.localize('general.delete'),
                icon: 'eva:trash-2-outline',
                onPress: (entity: AuthUser) => {
                  showDeleteConfirmation(entity.id)
                }
              }
            ] : [])
          ]}
          isLoading={isFetching}
          changePagination={changePagination}
          count={data?.result?.count ?? 0}
          pagination={pagination}
        />
      </Card>
    </>
  );
}
