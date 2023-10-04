export class apiError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class customError extends apiError {
    error: string;
    constructor(message: string, statusCode: number, error: string) {
        super(message, statusCode);
        this.error = error;
    }
}

const Errors = {
    unauthorized: new apiError('Unauthorized', 401),
    badRequest: new apiError('Bad Request', 400),
    userAlreadyExists: new apiError('User already exists', 409),
    passwordsDoNotMatch: new customError('Bad Request', 400, 'passwordsDoNotMatch'),
    userNotFound: new customError('User not found', 404, 'userNotFound'),
};

export default Errors;
