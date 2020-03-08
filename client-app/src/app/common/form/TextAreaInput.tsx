import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps
// HTMLInputElemt gelmesi gerekiyor ancak versiyon probleminden ötürü geberic ifadeye takılmaması için 'any' yazmak zorunda kalıyorum.
  extends FieldRenderProps<string, any>,
    FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  rows,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}  width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
