import { useEffect, useState } from "react";

export function useSessionStorage(key: string, initialValue?: any) {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue
        }

        const storedValue = sessionStorage.getItem(key)
        return storedValue !== "undefined" ? JSON.parse(storedValue!) : initialValue;
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [value, setValue])

    return [value, setValue]
}