import { Box, CircularProgress } from "@mui/material";

const LoadingContent = ({
  display,
}: { display: boolean }) => (
  display && (
    <Box sx={{ margin: 3, justifyContent: 'center', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </Box>
  )
);

export default LoadingContent;
