import { Stack, Typography, Box, TypographyPropsVariantOverrides } from "@mui/material";
import Iconify from "../iconify/Iconify";

const TitleWithAddButton = ({
  title,
  size = 'h6',
  onPressAddButton,
  showAddButton = true,
}: { title: string; onPressAddButton?: () => void; showAddButton?: boolean; size?: TypographyPropsVariantOverrides }) => (
  <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
    <Stack direction={'row'} spacing={1} sx={{ flex: '1 1 auto' }}>
      <Typography variant={size}>
        {title} 
      </Typography>
      {showAddButton && (
      <Box sx={{ mt: '-1px' }}>
        <Iconify sx={{ cursor: 'pointer' }} icon="material-symbols:add" fontSize={25} onClick={onPressAddButton} />
      </Box>)}
    </Stack>
  </Stack>
)

export default TitleWithAddButton;
