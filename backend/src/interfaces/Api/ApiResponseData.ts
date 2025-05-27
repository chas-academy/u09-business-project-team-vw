export interface ApiResponseData<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
}