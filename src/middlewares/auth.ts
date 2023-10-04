// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { env } from '../config';
// import Errors from '../utils/errors';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const isAuthUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const bearerToken = req.headers.authorization;
//         if (bearerToken) {
//             const token = bearerToken.split(' ')[1];
//             if (token) {
//                 console.log(token);
//                 const decodedToken = jwt.verify(token, env.JWT_SECRET);
//                 if (decodedToken) {
//                     const { id } = decodedToken as { id: string };
//                     const userLogged = await prisma.users.findUnique({
//                         where: {
//                             id: id,
//                         },
//                         select: {
//                             id: true,
//                             name: true,
//                             lastname: true,
//                             email: true,
//                             phoneNumber: true,
//                             status: true,
//                             type: true,
//                         },
//                     });
//                     res.locals.user = userLogged;
//                     return next();
//                 }
//             }
//         }
//         throw Errors.unauthorized;
//     } catch (error) {
//         next(error);
//     }
// };

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
