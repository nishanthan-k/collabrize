import React from 'react';
import { primaryBtnBg } from './colors';

type ButtonProps = {
  content?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  children?: React.ReactNode,
  className?: string,
};

console.log('primaryBtnBg on ui', primaryBtnBg)

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  variant = 'primary',
  disabled = false,
  children,
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold transition-colors duration-200';
  const variantStyles = {
    primary: `bg-[${primaryBtnBg}] text-white hover:bg-blue-600`,
    secondary: `bg-gray-500 text-white hover:bg-gray-600`,
    danger: `bg-red-500 text-white hover:bg-red-600`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className && className}`}
    >
      {children || content}
    </button>
  );
};

export default Button;
