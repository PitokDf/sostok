export interface responseApi {
    success: boolean;
    statusCode: number;
    msg: string;
    data?: any;
    errors?: any;
}