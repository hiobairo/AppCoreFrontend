// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Autocomplete,
  TextField,
  AutocompleteProps,
  ChipTypeMap,
  TextFieldProps as TextFieldPropsType,
} from '@mui/material';
import { ChangeEvent } from 'react';

// ----------------------------------------------------------------------

type Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> = {
  name: string;
  TextFieldProps?: TextFieldPropsType;
  label?: TextFieldPropsType['label'];
  renderInput?: AutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >['renderInput'];
} & Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput'>;

type VProps<
  T,
  V,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> = {
  getOptionValue: (option: T) => V;
} & Props<T, Multiple, DisableClearable, FreeSolo, ChipComponent>;

export default function RHFAutocomplete<
  T,
  // FIXME: Implement later, seems to be more complex than expected
  //        Needs to be able to handle freeSolo, multiple, etc.
  // V,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>({
  name,
  label,
  TextFieldProps,
  // FIXME: Implement later, seems to be more complex than expected
  //        Needs to be able to handle freeSolo, multiple, etc.
  // getOptionValue,
  onChange,
  renderInput,
  ...other
}: Props<T, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  // FIXME: Implement later, seems to be more complex than expected
  //        Needs to be able to handle freeSolo, multiple, etc.
  // }: VProps<T, V Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          value={field.value}
          onChange={(event, value, reason, details) => {
            field.onChange(value);
            onChange?.(event, value, reason, details);
          }}
          renderInput={
            renderInput
              ? (params) =>
                  renderInput({
                    ...params,
                    ...field,
                    error: !!error,
                    helperText: error?.message,
                    label,
                    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
                    ...TextFieldProps,
                  } as unknown as any) // FIXME: Using any here because of the type mismatch between renderInput's arg TextFieldProps
              : (params) => (
                  <TextField
                    {...params}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label={label}
                    onChange={(e) => {}}
                    {...TextFieldProps}
                  />
                )
          }
          {...other}
        />
      )}
    />
  );
}
