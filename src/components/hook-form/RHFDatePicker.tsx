// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/lab';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  TextFieldProps?: TextFieldProps;
};

type Props = IProps & Omit<Partial<DatePickerProps>, 'InputProps'>;

export default function RHFDatePicker({ name, clearable, TextFieldProps, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label="Basic example"
          {...field}
          {...other}
          value={field.value || null}
          renderInput={(params) => (
            <TextField
              {...params}
              {...TextFieldProps}
              error={!!error}
              helperText={error?.message}
            />
          )}
          clearable={clearable}
        />
      )}
    />
  );
}
