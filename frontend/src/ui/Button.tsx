/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface ButtonProps {
  content?: string;
  onClick?: () => void;
  primary?: boolean,
  secondary?: boolean,
  outlined?: boolean,
  fluid?: boolean,
  disabled?: boolean;
  children?: React.ReactNode,
  className?: string,
};

type ButtonVariants = "primary" | "secondary" | "outlined";

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  primary = false,
  secondary = false,
  outlined = false,
  fluid = false,
  disabled = false,
  children,
  className = '',
}) => {
  const baseStyles = 'text-darkTextColor text-sm font-medium px-2.5 py-1.5 rounded transition-colors duration-200 hover:opacity-90';
  const fluidStyles = `w-full`;
  const disabledStyles = `cursor-not-allowed opacity-50 hover:opacity-50`;
  
  const variant: ButtonVariants = outlined ? 'outlined' : secondary ? 'secondary' : 'primary';
  const variantStyles = {
    primary: `bg-primaryBtnBg`,
    secondary: `bg-secondaryBtnBg`,
    outlined: `text-textColor border border-textColor`
  }
  
  function getFinalStyle(obj: Record<string, string>) {
    return  Object.entries(obj)
                 .filter(([key]) => key && (key === 'className' || eval(key)))
                 .map(([_, style]) => style)
                 .join(' ')
  }
  const styleObj = {
    fluid: fluidStyles,
    disabled: disabledStyles,
    className: className
  }
  const buttonStyle = `${baseStyles} ${variantStyles[variant]} ${getFinalStyle(styleObj)}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle}
    >
      {children || content}
    </button>
  );
};

export default Button;
