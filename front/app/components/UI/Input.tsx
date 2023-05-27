"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  placeholder: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
};

const Input = (props: InputProps) => {
  const { placeholder, id, type, required, register, errors, disabled } = props;
  return (
    <div>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `
          form-input
          block
          w-full
          h-12
          rounded-md
          border-0
          py-1.5
          text-gray-900
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-sky-600
          sm:text-sm
          sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
};

export default Input;
