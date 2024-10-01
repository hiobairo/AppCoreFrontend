import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
} from '@mui/material';
import Iconify from '../iconify/Iconify';

type ButtonType = "button" | "submit" | "reset";

interface ActionButtonsProps {
  leftButtonTitle?: string;
  leftButtonType?: ButtonType;
  rightButtonTitle?: string;
  rightButtonType?: ButtonType;
  rightButtonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  onLeftButtonPress?: () => void;
  leftButtonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  onRightButtonPress?: () => void;
  showLeftButton?: boolean;
  showRightButton?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

const ActionButtons = ({
  leftButtonTitle = 'Clear all',
  leftButtonType = 'button',
  rightButtonTitle = 'Save',
  rightButtonType = 'button',
  onLeftButtonPress = () => {},
  onRightButtonPress = () => {},
  rightButtonColor = 'success',
  leftButtonColor = 'secondary',
  showLeftButton = true,
  showRightButton = true,
  isLoading = false,
  disabled = false,
}: ActionButtonsProps) => {
  const onLeftButtonPressHandler = () => {
    onLeftButtonPress()
  }
  
  const onRightButtonPressHandler = () => {
    onRightButtonPress()
  }
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={6} style={{ marginTop: '25px' }}>
        {showLeftButton && (
        <FormControl fullWidth>
          <Button
            disabled={isLoading || disabled}
            onClick={onLeftButtonPressHandler}
            size="medium"
            fullWidth
            variant="outlined"
            type={leftButtonType}
            color={leftButtonColor}
            sx={{ textTransform: 'initial', fontSize: '14px' }}
          >
            {leftButtonTitle}
          </Button>
        </FormControl>)}
      </Grid>
      <Grid item xs={6} style={{ marginTop: '25px' }}>
        {showRightButton && (
        <FormControl fullWidth>
          <Button
            disabled={isLoading || disabled}
            onClick={onRightButtonPressHandler}
            size="medium"
            style={{ width: '100%', textTransform: 'initial', fontSize: '14px' }}
            variant="contained"
            color={rightButtonColor}
            type={rightButtonType}
            sx={{
              backgroundColor: 'rgb(231, 85, 85)'
            }}
            startIcon={<Iconify icon='simple-line-icons:check' fontSize={5}/>}
          >
            {isLoading ? <CircularProgress size={20} /> : rightButtonTitle}
          </Button>
        </FormControl>)}
      </Grid>
    </Grid>
  )
};

export default ActionButtons;
