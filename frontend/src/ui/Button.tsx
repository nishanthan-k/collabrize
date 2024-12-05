import React from 'react';

type ButtonProps = {
  content: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseStyles = 'text-sm text-black dark:text-white px-2 py-1.5 rounded transition-colors duration-200';
  const variantStyles = {
    primary: 'bg-mediumBlue hover:bg-hoverBlue',
    secondary: 'bg-gray-400 hover:bg-gray-500',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {content}
    </button>
  );
};

export default Button;
