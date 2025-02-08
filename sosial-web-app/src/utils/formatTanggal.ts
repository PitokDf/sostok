export const formatHours = (date: string) => {
    const objectDate = new Date(date)

    return objectDate.toLocaleString("id", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}