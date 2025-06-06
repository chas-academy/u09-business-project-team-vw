import { ApiResponseData } from '../interfaces/Api/ApiResponseData';

export function successResponse<T>(message: string, data: T): ApiResponseData<T> {
    return {
        success: true,
        message,
        data
    };
}

export function errorResponse<T>(message: string, data: T): ApiResponseData<T> {
    return {
        success: false,
        message,
        data
    };
}