import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { LoadingIcon } from "./icons/LoadingIcon";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md";

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const variantClasses = {
    primary:
      "bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500 border border-transparent shadow-sm",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 border border-transparent",
    outline:
      "bg-transparent hover:bg-gray-50 text-teal-600 hover:text-teal-700 focus:ring-teal-500 border border-teal-500",
    ghost:
      "bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500 border border-transparent",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 border border-transparent shadow-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading && <LoadingIcon />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {isLoading && loadingText ? (
        <span className="ml-2">{loadingText}</span>
      ) : (
        children
      )}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
