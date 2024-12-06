import React from 'react';

type ButtonProps = {
  content: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fluid?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { content, onClick, variant = 'primary', disabled = false, fluid = false } = props;

  const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2';
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    secondary: 'bg-gray-400 text-black hover:bg-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabled && 'cursor-not-allowed opacity-50'}
        ${fluid && 'w-full'}
      `}
    >
      {content}
    </button>
  );
};

export default Button;
