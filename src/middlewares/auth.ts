import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Errors from '../utils/errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isUserLogged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('auth');
        const bearerToken = req.headers.authorization;
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            if (token) {
                console.log(token);
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
                if (decodedToken) {
                    const { id } = decodedToken as { id: string };
                    const userLogged = await prisma.users.findUnique({
                        where: {
                            id: id,
                        },
                    });
                    if (userLogged) {
                        res.locals.user = userLogged;
                        return next();
                    }
                    throw Errors.unauthorized;
                }
            }
        }
        throw Errors.unauthorized;
    } catch (error) {
        next(error);
    }
};

// export const isAdminUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userLogged = res.locals.user;
//         if (userLogged.type === 'admin') {
//             return next();
//         }
//         throw Errors.forbidden;
//     } catch (error) {
//         next(error);
//     }
// };
