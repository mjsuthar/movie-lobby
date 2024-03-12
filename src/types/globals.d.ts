

export interface GlobalFunctionTypes {
    sendSuccessResponse: (req: any, res: any, data?: any, statusCode?: number, message?: string) => void;
    sendErrorResponse: (req: any, res: any, data?: any, statusCode?: number, message?: string) => void;
    currentTimeStamp: () => currentDateTimeStamp;
}

export interface GlobalErrorMessageTypes {
    UNAUTHORIZED: string;
}

export interface GlobalSuccessMessageTypes {
    LOGIN_SUCCESS: string;
}

export interface GlobalMessageTypes {
    ERROR: GlobalErrorMessageTypes,
    SUCCESS: GlobalSuccessMessageTypes
}

export interface GlobalTypes {
    FN: GlobalFunctionTypes,
    MESSAGE: GlobalMessageTypes
}