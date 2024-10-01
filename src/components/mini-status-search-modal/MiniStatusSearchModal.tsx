import { Box, Button, CircularProgress, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
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

type MiniStatusSearchModalProps = {
  open: boolean;
  onClose: () => void;
  onChange: (status: number, comment?: string) => void;
  isLoading: boolean;
}

type StatusType = { id: number; name: string; code: number; color: string; }

export const statuses: StatusType[] = [
  {
    id: 1,
    name: 'Nuevo',
    code: 0,
    color: 'color(srgb 0.3882 0.3569 1)',
  },
  {
    id: 2,
    name: 'Hold',
    code: 1,
    color: 'color(srgb 0.89 0 0.1383)',
  },
  {
    id: 3,
    name: 'Abierto',
    code: 2,
    color: 'rgb(159, 159, 158)',
  },
  {
    id: 4,
    name: 'En progreso',
    code: 3,
    color: 'rgb(240, 157, 20)',
  },
  {
    id: 5,
    name: 'Resuelto',
    code: 4,
    color: 'color(srgb 0.0823 0.7177 0.6236)',
  },
  {
    id: 6,
    name: 'Rechazado',
    code: 5,
    color: 'color(srgb 0.0823 0.7177 0.6236)',
  },
  {
    id: 7,
    name: 'Cerrado',
    code: 6,
    color: 'color(srgb 0.0823 0.7177 0.6236)',
  },
  {
    id: 8,
    name: 'Cancelado',
    code: 7,
    color: 'color(srgb 0.0823 0.7177 0.6236)',
  },
]

const MiniStatusSearchModal = ({
  open,
  onClose,
  onChange = () => {},
  isLoading = false,
}: MiniStatusSearchModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
  const [changeReason, setChangeReason] = useState('' as string);

  const onChangeIntern = () => {
    onChange(selectedStatus?.code ?? '', changeReason);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Grid container >
        <Box sx={style}>
          <Box sx={{ padding: 1 }}>
            <SectionTitle
              title='Cambiar estado'
              icon='gg:check-o'
              hideAddButton={true}
            />
            <Box sx={{ mt: 1 }}>
              {statuses.map((status) => (
                <Stack
                  key={status.id}
                  onClick={() => setSelectedStatus(status)}
                  direction='row'
                  sx={{
                    ...(selectedStatus?.code !== status.code && { '&:hover': { bgcolor: 'rgb(244, 244, 244)' } }),
                    mt: 1,
                    padding: 1,
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: `1px solid ${selectedStatus?.code === status.code ? status.color : 'transparent'}`
                  }}
                >
                  <Box sx={{ bgcolor: status.color, widht: 20, height: 20 }}>
                    <Typography color='transparent'>x</Typography>
                  </Box>
                  <Typography sx={{ ml: 2, textAlign: 'center' }} >{status.name}</Typography>
                </Stack> 
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label='Razón de cambio'
                multiline
                rows={4}
                fullWidth
                onChange={(e) => setChangeReason(e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant='contained'
                color='info'
                size='medium'
                onClick={onChangeIntern}
                fullWidth
                disabled={changeReason === '' || isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Cambiar estado'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Modal>
  )
}

export default MiniStatusSearchModal;