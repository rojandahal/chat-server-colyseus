export default class ApiError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string): ApiError {
        return new ApiError(400, msg);
    }

    static serverError(msg: string): ApiError {
        return new ApiError(500, msg);
    }

    static conflict(msg: string): ApiError {
        return new ApiError(409, msg);
    }

    static unauthorized(msg: string): ApiError {
        return new ApiError(401, msg);
    }

    static forbidden(msg: string): ApiError {
        return new ApiError(403, msg);
    }

    static unprocessable(msg: string): ApiError {
        return new ApiError(422, msg);
    }

    static notfound(msg: string): ApiError {
        return new ApiError(404, msg);
    }

    static duplicateField(msg: string): ApiError {
        return new ApiError(400, msg);
    }

    static validationError(msg: string): ApiError {
        return new ApiError(400, msg);
    }
}