import { Request, Response, NextFunction } from 'express';

export const returnUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        const responseBody = {
            message: 'User logged successfully',
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                status: user.status,
                type: user.type,
                imageUrl: user.imageUrl,
            },
        };
        return res.status(200).json(responseBody);
    } catch (error) {
        next(error);
    }
};
