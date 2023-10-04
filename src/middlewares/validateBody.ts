import { Request, Response, NextFunction } from 'express';
import Errors from '../utils/errors';

export const validateBody = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parse(req.body);
            next();
        } catch (error) {
            console.log('-----------------------------');
            console.log(error);
            console.log('-----------------------------');
            error = Errors.badRequest;
            next(error);
        }
    };
};
