export const getUserLogin = async () => {
    const user = {};
    return user as {
        id: number,
        username: string,
        email: string
    };
}