import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';
import React from 'react';

interface IProps
// HTMLInputElemt gelmesi gerekiyor ancak versiyon probleminden ötürü geberic ifadeye takılmaması için 'any' yazmak zorunda kalıyorum.
  extends FieldRenderProps<string, any>,
    FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}  width={width}>
      <Select value={input.value} onChange={(e, data) => input.onChange(data.value)} placeholder={placeholder} options={options} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;