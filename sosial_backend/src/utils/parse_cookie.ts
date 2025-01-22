export const parseCookie = (cookies: string | undefined, key: string) => {
    if (!cookies) return null;
    const cookie = cookies.split(";").find((cookie) => cookie.trim().startsWith(`${key}=`));
    return cookie ? cookie?.split("=")[1] : null;
}