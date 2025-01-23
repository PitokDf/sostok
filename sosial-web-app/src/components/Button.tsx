import React from "react";

interface ButtonProps {
    shape?: "rounded" | "square";
    size?: "small" | "medium" | "large";
    type?: "button" | "submit";
    variant?: "primary" | "secondary" | "warning" | "error" | "success";
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string
}

export default function Button({
    shape = "rounded",
    size = "medium",
    type = "button",
    variant = "primary",
    isLoading = false,
    children,
    className
}: ButtonProps) {
    const baseStyles = "px-4 py-2 transition-button shadow-button disabled:cursor-not-allowed";
    const shapeStyles = shape === "rounded" ? "rounded-full" : "rounded-md";
    const sizeStyles =
        size === "small"
            ? "text-sm"
            : size === "medium"
                ? "text-base"
                : "text-lg";
    const variantStyles = `bg-${variant} text-white hover:bg-${variant}-hover active:bg-${variant}-active disabled:bg-${variant}-disabled`;

    return (
        <button
            type={type}
            className={`${baseStyles} ${shapeStyles} ${sizeStyles} ${variantStyles} ${className}`}
            disabled={isLoading}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}
