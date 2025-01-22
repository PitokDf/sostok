import React from 'react';

type ButtonProps = {
    type?: 'submit' | 'reset' | 'button';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info';
    size?: 'small' | 'medium' | 'large';
    shape?: 'rounded' | 'square' | 'icon' | 'text';
    isLoading?: boolean;
    isDisabled?: boolean;
    children: React.ReactNode;
};

export default function Button({
    type = 'button',
    variant = 'primary',
    size = 'medium',
    shape = 'rounded',
    isLoading = false,
    isDisabled = false,
    children,
}: ButtonProps) {
    let baseStyle = 'p-2';
    let variantStyle = '';
    let sizeStyle = '';
    let shapeStyle = '';

    // Variant styles
    switch (variant) {
        case 'primary':
            variantStyle = 'bg-blue-600 text-white';
            break;
        case 'secondary':
            variantStyle = 'bg-gray-500 text-white';
            break;
        case 'tertiary':
            variantStyle = 'bg-transparent text-blue-600';
            break;
        case 'danger':
            variantStyle = 'bg-red-600 text-white';
            break;
        case 'success':
            variantStyle = 'bg-green-600 text-white';
            break;
        case 'warning':
            variantStyle = 'bg-yellow-500 text-black';
            break;
        case 'info':
            variantStyle = 'bg-blue-300 text-black';
            break;
    }

    // Size styles
    switch (size) {
        case 'small':
            sizeStyle = 'text-sm';
            break;
        case 'medium':
            sizeStyle = 'text-base';
            break;
        case 'large':
            sizeStyle = 'text-lg';
            break;
    }

    // Shape styles
    switch (shape) {
        case 'rounded':
            shapeStyle = 'rounded-full';
            break;
        case 'square':
            shapeStyle = 'rounded-none';
            break;
        case 'icon':
            shapeStyle = 'p-2';
            break;
        case 'text':
            shapeStyle = 'bg-transparent text-blue-600';
            break;
    }

    if (isDisabled) {
        baseStyle += 'opacity-50 cursor-not-allowed ';
    }

    return (
        <button
            type={type}
            className={`${baseStyle} ${variantStyle} ${sizeStyle} ${shapeStyle}`}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? <span>Loading...</span> : children}
        </button>
    );
}
