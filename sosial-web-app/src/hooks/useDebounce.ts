import { useCallback, useRef } from 'react';

export const useDebounceCallback = (callback: () => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay]);
};