import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import {DateTimePicker} from 'react-widgets';
import ReactDatePicker from 'react-datepicker';

interface IProps
  extends FieldRenderProps<Date, HTMLInputElement>,
    FormFieldProps {} 

const DateInput: React.FC<IProps> = ({
    input,
    width,
    onChange,
    date = false,
    time = false,
    meta: { touched, error },
  }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
          <ReactDatePicker 
              onChange={input.onChange} />


        {/* <DateTimePicker 
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onKeyDown={(e) => e.preventDefault()}
            date={date}
            time={time}
           
        />
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )} */}
      </Form.Field>
    )
}

export default DateInput
