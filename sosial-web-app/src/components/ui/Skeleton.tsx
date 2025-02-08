'use cient'

import * as React from "react"

const Skeleton = (
    { className, variant = "rectangle", ...props }: React.HTMLAttributes<HTMLDivElement> & {
        variant?: "rectangle" | "circle" | "text"
    }) => {
    let baseClass = "animate-pulse bg-gray-200";

    // Tambahkan class tambahan berdasarkan variant
    if (variant === "rectangle") {
        baseClass += " rounded-md";
    } else if (variant === "circle") {
        baseClass += " rounded-full";
    } else if (variant === "text") {
        baseClass += " h-4";
    }

    const finalClass = className ? `${baseClass} ${className}` : baseClass;

    return <div className={finalClass}
        {...props} />
}

export { Skeleton }
