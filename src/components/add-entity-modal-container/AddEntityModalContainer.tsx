import { Box, Icon, Modal } from "@mui/material";
import { ReactNode } from "react";
import Iconify from "../iconify/Iconify";

const AddEntityModalContainer = ({ sx = {}, open, onClose, children }: { sx?: any; open: boolean, onClose: () => void, children: ReactNode }) => (
  <Modal
    open={open}
    onClose={onClose}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1,
        pt: 3,
        pb: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 25,
          right: 20,
          p: 1,
          zIndex: 99999,
        }}
      >
        <Iconify onClick={onClose} icon='ic:round-close' fontSize={30} color='#2c3e50' sx={{ cursor: 'pointer', }} />
      </Box>
      {children}
    </Box>
  </Modal>
);

export default AddEntityModalContainer;
