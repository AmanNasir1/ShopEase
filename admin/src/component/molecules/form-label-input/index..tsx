import React from "react";
import { Form, Input, Select, InputNumber, DatePicker } from "antd";
import type { Rule } from "antd/es/form";
import { cn } from "../../../utils/helper/tailwind-helper";

interface BaseInputProps {
  label: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
}

interface TextInputProps extends BaseInputProps {
  type?: "text" | "email" | "tel";
}

interface SelectInputProps extends BaseInputProps {
  options: { label: string; value: any }[];
}

interface NumberInputProps extends BaseInputProps {
  min?: number;
  max?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  rules,
  required = false,
  placeholder,
  type = "text",
  ...props
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <div className="flex flex-col ">
      {label && <span className={cn("text-base text-[#444444]")}>{label}</span>}
      <Form.Item name={name} rules={[...defaultRules, ...(rules || [])]}>
        <Input
          type={type}
          placeholder={placeholder}
          className="h-[50px] px-5"
          {...props}
        />
      </Form.Item>
    </div>
  );
};

export const PasswordInput: React.FC<BaseInputProps> = ({
  label,
  name,
  rules,
  required = false,
  placeholder,
  ...props
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <div className="flex flex-col gap-1">
      {label && <span className={cn("text-base text-[#444444]")}>{label}</span>}
      <Form.Item name={name} rules={[...defaultRules, ...(rules || [])]}>
        <Input.Password
          placeholder={placeholder}
          className={cn("h-[50px]")}
          {...props}
        />
      </Form.Item>
    </div>
  );
};

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  rules,
  required = false,
  placeholder,
  options,
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[...defaultRules, ...(rules || [])]}
    >
      <Select placeholder={placeholder} options={options} />
    </Form.Item>
  );
};

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  rules,
  required = false,
  placeholder,
  min,
  max,
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[...defaultRules, ...(rules || [])]}
    >
      <InputNumber
        placeholder={placeholder}
        min={min}
        max={max}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};

export const DateInput: React.FC<BaseInputProps> = ({
  label,
  name,
  rules,
  required = false,
  placeholder,
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label} is required` }]
    : [];

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[...defaultRules, ...(rules || [])]}
    >
      <DatePicker placeholder={placeholder} style={{ width: "100%" }} />
    </Form.Item>
  );
};
