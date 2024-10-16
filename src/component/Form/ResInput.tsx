/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  size?: SizeType;
  placeholder?: string;
  defaultValue?: any;
  labelColor?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const EInput = ({
  className,
  type,
  name,
  label,
  size,
  placeholder,
  defaultValue,
  disabled = false,
  required = false,
  
}: InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}
         
          
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          {type === "password" ? (
            <Input.Password
            className={className}
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
            />
          ) : (
            <Input
            className={className}
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default EInput;
