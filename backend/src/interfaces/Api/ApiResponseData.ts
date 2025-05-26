export interface ApiResponseData<T = any> {
    success: Boolean;
    message: String;
    data: T | null;
}