export class HttpError {
    public code: number;
    public message: string;

    constructor(code: number = 0, message: string = '') {
        this.code = code;
        this.message = message;
    }
}
