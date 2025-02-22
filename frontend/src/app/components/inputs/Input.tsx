import React, { InputHTMLAttributes, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
  id: string;
  label: string;
  error?: string;
  helpText?: string;
  labelRight?: React.ReactNode;
  register?: UseFormRegisterReturn;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      error,
      helpText,
      className = "",
      labelRight,
      required,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-teal-600 ml-1">*</span>}
          </label>
          {labelRight && (
            <div className="text-sm text-teal-600 hover:text-teal-500">
              {labelRight}
            </div>
          )}
        </div>

        <input
          id={id}
          type={type}
          className={`w-full px-3 py-2 border ${
            error
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-teal-500"
          } rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition ${className}`}
          ref={ref}
          required={required}
          {...register}
          {...props}
        />

        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helpText}</p>
        )}

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
