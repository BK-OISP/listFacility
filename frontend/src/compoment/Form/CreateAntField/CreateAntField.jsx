import React from "react";
import { Form, Input, Select, InputNumber, DatePicker } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  setOtherValue,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;

  const onInputChange = ({ target: { value } }) => {
    form.setFieldValue(field.name, value);
  };

  const onChange = (value) => {
    form.setFieldValue(field.name, value);
    setOtherValue && setOtherValue(value);
  };

  const onBlur = () => form.setFieldTouched(field.name, true);

  // const tailLayout = {
  //   wrapperCol: { offset: 0, span: 16 },
  // };

  const AntStyle = (type) => {
    switch (type) {
      case "textarea":
        return (
          <Input.TextArea
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={onInputChange}
            rows={5}
            style={{ resize: "none" }}
          />
        );
      case "number":
        return (
          <InputNumber
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={onChange}
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        );
      case "text":
        return (
          <Input
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={onInputChange}
          />
        );
      case "select":
        return (
          <Select
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={onChange}
            showSearch
          >
            {selectOptions &&
              selectOptions.map((name) => (
                <Option key={name.label} value={name.value}>
                  {name.label}
                </Option>
              ))}
          </Select>
        );
      case "datepicker":
        return (
          <DatePicker
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={onChange}
          />
        );

      default:
        return;
    }
  };

  return (
    <FormItem
      // {...tailLayout}
      label={label}
      hasFeedback={
        (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
      }
      help={submittedError || touchedError ? hasError : false}
      validateStatus={submittedError || touchedError ? "error" : "success"}
    >
      {AntStyle(type)}
    </FormItem>
  );
};

export default CreateAntField;
