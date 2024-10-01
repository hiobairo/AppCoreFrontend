import { Avatar, Box, Grid, InputAdornment, Modal, Stack, Button, TextField, Typography, CircularProgress } from "@mui/material";
import Iconify from "../iconify/Iconify";
import { useUsers } from "../../modules/users/api/users";
import LoadingContent from "../loading-content/LoadingContent";
import { useState } from "react";
import { AuthUser } from "@hiobairo/app-core";
import NoDataContent from "../no-data-content/NoDataContent";
import { AuthUserExpandedType } from "../../modules/users/@types/AuthUserExpandedType";
import SectionTitle from "../section-title/SectionTitle";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  boxShadow: 'none',
  borderRadius: '5px',
  padding: 2,
  paddingTop: 3,
};

type MiniUserSearchModalProps = {
  open: boolean;
  onClose: () => void;
  onChange: (user: AuthUser, changeReason?: string) => void;
  isLoading: boolean;
  hideCommentField?: boolean;
}

const MiniUserSearchModal = ({
  open,
  onClose,
  onChange = () => {},
  isLoading = false,
  hideCommentField = false,
}: MiniUserSearchModalProps) => {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);
  const [changeReason, setChangeReason] = useState('' as string);
  const { data, isFetching, refetch } = useUsers({
    firstName: nameFilter,
    pagination: {
      take: 1000,
      skip: 0
    }
  })
  const users = data?.items ?? [];

  const onChangeIntern = () => {
    onChange(selectedUser, changeReason);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Grid container >
        <Box sx={style}>
          <SectionTitle
            title='Reasignar usuario'
            icon='lucide:user-round-plus'
            hideAddButton={true}
          />
          <Stack flexDirection={'row'} spacing={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              size='small'
              placeholder="Ingresa el nombre de un usuario para buscar"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon='eva:search-outline' fontSize={20} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <Button
              variant='contained'
              color='info'
              size='medium'
              onClick={() => refetch()}
            >Buscar</Button>
          </Stack>
          <Box sx={{ padding: 1 }}>
            <Box sx={{ mt: 1 }}>
              <Typography color='color(srgb 0.4 0.4392 0.5216)'>
                Usuarios
              </Typography>
            </Box>
            <LoadingContent
              display={isFetching}
            />
            <NoDataContent text={'No se encontraron usuarios'} display={(users.length === 0 && !isFetching) ? true : false} />
            {!isFetching && (
            <Box sx={{ mt: 1 }}>
              {users.map((user: AuthUserExpandedType) => (
                <Stack
                  key={user?.id}
                  onClick={() => setSelectedUser(user)}
                  direction='row'
                  sx={{
                    padding: 1,
                    cursor: 'pointer',
                    ...(selectedUser?.id !== user?.id && { ":hover": { bgcolor: 'rgb(244, 244, 244)' } }),
                    bgcolor: selectedUser?.id === user?.id ? 'rgb(4, 170, 214)' : 'transparent',
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'primary' }}>{user?.firstName?.[0]}{user?.lastName?.[0]}</Avatar>
                  <Box>
                    <Typography
                      sx={{
                        ml: 2,
                        ...(selectedUser?.id !== user?.id && { '&:hover': { color: 'color(srgb 0.1804 0.251 0.3177)' } })
                      }}
                      color={
                        selectedUser?.id === user?.id ? 'white' : 'none'
                      }
                    >{user?.firstName} {user?.lastName}</Typography>
                    <Typography
                      fontSize={13}
                      sx={{
                        ml: 2,
                        ...(selectedUser?.id !== user?.id && { '&:hover': { color: 'color(srgb 0.43 0.43 0.43)' } })
                      }}
                      color={selectedUser?.id === user?.id ? 'white' : 'color(srgb 0.43 0.43 0.43)'}
                    >{user?.email} - {user?.location?.name}</Typography>
                  </Box>
                </Stack>
              ))}
            </Box>)}
            {!hideCommentField && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  label='Razón de cambio'
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => setChangeReason(e.target.value)}
                />
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                variant='contained'
                color='info'
                size='medium'
                onClick={onChangeIntern}
                fullWidth
                disabled={(!hideCommentField && changeReason === '') || !selectedUser || isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Reasignar'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Modal>
  )
}

export default MiniUserSearchModal;