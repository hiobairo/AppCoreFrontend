import { Box, Stack, Typography } from "@mui/material";
import AddButton from "../add-button/AddButton";
import Iconify from "../iconify/Iconify";
import { checkValidPermission } from "@hiobairo/app-core";

type SectionTitleProps = {
  title: string;
  icon?: string;
  addButton?: {
    title: string;
    onClick: () => void;
    icon: string;
    permissions: string[];
  };
  hideAddButton?: boolean;
}

const SectionTitle = ({
  title,
  icon = '',
  addButton,
  hideAddButton = false,
}: SectionTitleProps) => (
  <Stack sx={{ mb: 5 }} direction="row" spacing={3}>
    <Stack direction={'row'} spacing={1} sx={{ flex: '1 1 auto' }}>
      <Box sx={{ mt: 0.6 }}> 
        <Iconify icon={icon} fontSize={30} />
      </Box>
      <Box sx={{ mt: 0.7 }}>
        <Typography sx={{ top: 2 }} variant="h5">{title}</Typography>
      </Box>
    </Stack>
    <div>
      {!hideAddButton && checkValidPermission(addButton?.permissions ?? []) && (
      <AddButton
        onClick={addButton?.onClick}
        text={addButton?.title ?? ''}
        icon={addButton?.icon ?? ''}
      />)}
    </div>
  </Stack>
)

export default SectionTitle;
