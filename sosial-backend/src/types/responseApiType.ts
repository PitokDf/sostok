export interface ResponseApi {
    success: boolean,
    statusCode: number,
    msg: string,
    data?: any,
    errors?: any
}
