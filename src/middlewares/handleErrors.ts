import { Request, Response, NextFunction } from 'express';
import { apiError, customError } from '../utils/errors';

const handleErrors = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(error);
        if (error instanceof apiError || error.error !== undefined) {
            if (error.error !== undefined) {
                return res.status(error.statusCode).json({
                    message: error.message,
                    statusCode: error.statusCode,
                    error: error.error,
                });
            }
            return res.status(error.statusCode).json({
                message: error.message,
                statusCode: error.statusCode,
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error',
                statusCode: 500,
            });
        }
    } catch (error) {
        next(error);
    }
};

export default handleErrors;
