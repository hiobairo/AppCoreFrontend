import { Button, SxProps } from "@mui/material";
import Iconify from "../iconify/Iconify";

type AddButtonProps = {
  icon: string;
  text: string;
  onClick: () => void;
  sx?: SxProps;
  fullWidth? : boolean;
}

export const AddButton = ({
  icon,
  text,
  onClick,
  sx = {},
  fullWidth = false,
}: AddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      size='medium'
      fullWidth={fullWidth}
    >
      <Iconify icon={icon} sx={{ mr: 1, fontSize: 20, ...sx }} />  {text}
    </Button>
  )
}

export default AddButton;
