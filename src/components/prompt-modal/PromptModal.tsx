import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import ActionButtons from '../action-buttons/ActionButtons';

type PromptModalPropsType = {
  title?: string;
  subtitle?: string;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  onContinuePress: () => void;
  onCancelPress: () => void;
  open: boolean;
  disableButtons: boolean;
  isLoading: boolean;
}

const PromptModal = ({
  title,
  subtitle,
  leftButtonTitle,
  rightButtonTitle,
  onContinuePress = () => {},
  onCancelPress = () => {},
  open = false,
  disableButtons = false,
  isLoading = false,
}: PromptModalPropsType) => (
  <Dialog
    open={open}
    onClose={onCancelPress}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <Box
      sx={{
        padding: 2
      }}
    >
      <DialogTitle id="delete-note-modal-title">
        {title ?? "Esta seguro que desea eliminar este registro?"}
      </DialogTitle>
      {subtitle && <DialogContent>
        <DialogContentText id="delete-note-modal-description">
        {subtitle ?? "Esta acción no se puede deshacer."}
        </DialogContentText>
      </DialogContent>}
      <DialogActions>
        <ActionButtons
          leftButtonTitle={leftButtonTitle ?? "No, vovler"}
          rightButtonTitle={rightButtonTitle ?? "Si, eliminar"}
          onLeftButtonPress={onCancelPress}
          onRightButtonPress={onContinuePress}
          disabled={disableButtons}
          isLoading={isLoading}
          rightButtonColor='error'
          leftButtonColor='success'
        />
      </DialogActions>
    </Box>
  </Dialog>
)

export default PromptModal;
