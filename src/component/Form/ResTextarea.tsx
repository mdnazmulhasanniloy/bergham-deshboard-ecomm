/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
const { TextArea } = Input;
interface InputProps {
  name: string;
  label?: string;
  size?: SizeType;
  maxLength?: number;
  placeholder?: string;
  labelColor?: string;
  className?: string;
  style?: object;
}

const ETextArea = ({
  name,
  label,
  size,
  placeholder,
  labelColor = "black",
  className,
  maxLength,
  style,
}: InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={<label style={{ color: labelColor }}>{label}</label>}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <TextArea
            className={className}
            maxLength={maxLength}
            showCount
            {...field}
            id={name}
            size={size}
            placeholder={placeholder}
            style={style}
          />
        </Form.Item>
      )}
    />
  );
};

export default ETextArea;
