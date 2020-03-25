import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  date= false,
  time= false,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        value={input.value ||null}
        onBlur={input.onBlur}
        onKeyDown={(e)=> e.preventDefault()}
        onChange={input.onChange}
        placeholder={placeholder}
        date={date}
        time={time}
        id={input.id}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
