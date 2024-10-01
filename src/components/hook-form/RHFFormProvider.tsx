import { ReactNode } from 'react';
// form
import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props<T extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
  debug?: boolean;
}

export default function RHFFormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  debug,
}: Props<T>) {
  if (debug) {
    console.log({
      action: 'FormProvider render',
      values: methods.watch(),
      ...methods.formState,
    });
  }

  return (
    <Form {...methods}>
      <form style={{ height: 'inherit' }} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
