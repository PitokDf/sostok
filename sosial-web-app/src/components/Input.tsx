import { Eye } from "lucide-react";
import React, { ChangeEventHandler, LegacyRef } from "react";

interface inputProps {
    type?: "button" | "checkbox" | "color" | "date"
    | "datetime-local" | "email" | "file" | "hidden"
    | "image" | "month" | "number" | "password"
    | "radio" | "range" | "reset" | "search" | "submit"
    | "tel" | "text" | "time" | "url" | "week",
    placeholder?: string,
    id: string,
    variant?: "error" | "normal",
    onChange?: ChangeEventHandler | undefined,
    name?: string,
    value?: any,
    accept?: string,
    ref?: LegacyRef<HTMLInputElement> | undefined,
    suffixIcon?: React.ReactNode,
    preffixIcon?: React.ReactNode
}

const normal = "border-secondary focus:ring-primary";
const error = "border-error focus:ring-error";

export default function Input(
    {
        type = "text",
        placeholder,
        id,
        variant = "normal",
        onChange,
        name,
        value,
        accept,
        ref,
        suffixIcon,
        preffixIcon
    }: inputProps) {

    return (
        <div className="relative">
            {preffixIcon && (<div className="absolute left-2 top-2 text-secondary">{preffixIcon}</div>)}
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                accept={accept}
                ref={ref}
                id={id}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${suffixIcon && "pr-9"} ${preffixIcon && "pl-9"} focus:ring-2 focus:border-transparent ${variant === "normal" ? normal : error}`}
                placeholder={placeholder}
                required
            />
            {suffixIcon && (<div className="absolute right-2 top-2 text-secondary">{suffixIcon}</div>)}
        </div>
    );
}