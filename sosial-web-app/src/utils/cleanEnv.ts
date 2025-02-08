export const cleanEnv = (key: string) => {
    return key.replace('"', "").replace('";', "")
}