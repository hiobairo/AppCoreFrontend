import { Avatar, Typography } from "@mui/material";
import MiniUserSearchModal from "../mini-user-search-modal/MiniUserSearchModal";
import useObjectState from "../../hooks/useObjectState";
import { AuthUser } from '@hiobairo/app-core';

const EntityListAvatar = ({
  user,
  onChange = () => {},
  allowUserSelector = true,
  hideCommentField = false,
}: { user: AuthUser; onChange?: (user: AuthUser, comment?: string) => void; allowUserSelector?: boolean; hideCommentField?: boolean; }) => {
  const [{
    openMiniUserSearchModal,
  }, updateState] = useObjectState({
    openMiniUserSearchModal: false,
  })

  const openMiniSearchUserModal = () =>
    updateState({ openMiniUserSearchModal: true });

  const closeMiniSearchUserModal = () =>
    updateState({ openMiniUserSearchModal: false });

  return (
    <>
      {allowUserSelector && openMiniUserSearchModal && (
      <MiniUserSearchModal
        open={openMiniUserSearchModal}
        onClose={closeMiniSearchUserModal}
        onChange={(user) => {
          onChange(user);
          updateState({
            openMiniUserSearchModal: false,
          })
        }}
        hideCommentField={hideCommentField}
      />)}
      {user ? (
        <Avatar onClick={openMiniSearchUserModal} sx={{ bgcolor: 'primary', cursor: 'pointer' }}>{`${user?.firstName?.[0]}${user?.lastName?.[0]}`.toUpperCase()}</Avatar>
      ) : (
        <Typography fontWeight={600} onClick={openMiniSearchUserModal} sx={{ cursor: 'pointer' }}>Agregar usuario</Typography>
      )}
    </>
  )
}

export default EntityListAvatar;
