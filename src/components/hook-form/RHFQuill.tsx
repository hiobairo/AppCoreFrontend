import { FormControl, FormHelperText } from '@mui/material';
import useId from '@mui/material/utils/useId';
import { useFormContext, Controller } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & ReactQuillProps;

export function RHFQuill({ name, ...other }: Props) {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          {error && (
            <style>{`
            #${id}.rhf-quill .ql-toolbar, #${id}.rhf-quill .ql-container {
              border-color: red;
            }
          `}</style>
          )}
          <ReactQuill {...field} id={id} className="rhf-quill" theme="snow" {...other} />
          {!!error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
