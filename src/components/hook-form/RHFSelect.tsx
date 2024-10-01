// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  SelectProps,
  Select,
} from '@mui/material';
import useId from '@mui/material/utils/useId';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: any;
};

type Props = IProps & SelectProps;

export default function RHFSelect({ name, children, fullWidth, label, variant, ...other }: Props) {
  const { control } = useFormContext();
  const labelId = useId();

  return (
    <FormControl fullWidth={fullWidth} variant={variant}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select labelId={labelId} {...field} fullWidth label={label} error={!!error} {...other}>
              {children}
            </Select>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
}
