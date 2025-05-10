export const storeToLocalStorage = (key: string, data: any) => {
    if (typeof window == "undefined") return;
    localStorage.setItem(key, typeof data === "string" ? data : JSON.stringify(data))
}

export const getFromLocalStorage = (key: string) => {
    if (typeof window == "undefined") return;
    return JSON.parse(localStorage.getItem(key)!)
}

export const removeFromLocaleStorage = (key: string) => {
    if (typeof window == "undefined") return;
    localStorage.removeItem(key)
}