import { Request, Response, NextFunction } from 'express';
import prisma from '../services/database';
import bcrypt from 'bcryptjs';
import uuid4 from 'uuid4';
import jwt from 'jsonwebtoken';
import { userTypes, userStatus } from '../utils/interfaces';
import Errors from '../utils/errors';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (user && user.status === userStatus.ACTIVE && user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                    expiresIn: '7d',
                });
                const responseBody = {
                    message: 'User logged successfully',
                    user: {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        status: user.status,
                        type: user.type,
                    },
                    token,
                };
                return res.status(200).json(responseBody);
            }
        }
        throw Errors.unauthorized;
    } catch (error) {
        next(error);
    }
};

export const signInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastname, email, googleId, imageUrl } = req.body;
        console.log(req.body);
        const userExists = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        let responseBody = {};

        if (!userExists) {
            const user = await prisma.users.create({
                data: {
                    id: uuid4(),
                    name,
                    lastname,
                    email,
                    googleId,
                    imageUrl,
                    type: userTypes.USER,
                    status: userStatus.ACTIVE,
                },
            });
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: '7d',
            });
            responseBody = {
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
                token,
            };
        } else {
            const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET as string, {
                expiresIn: '7d',
            });
            responseBody = {
                message: 'User logged successfully',
                user: {
                    id: userExists.id,
                    name: userExists.name,
                    lastname: userExists.lastname,
                    email: userExists.email,
                    imageUrl: userExists.imageUrl,
                    status: userExists.status,
                    type: userExists.type,
                },
                token,
            };
        }
        console.log(responseBody);
        return res.status(200).json(responseBody);
    } catch (error) {
        next(error);
    }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastname, email, password, confirmPassword } = req.body;
        const userExists = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (!userExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.users.create({
                data: {
                    id: uuid4(),
                    name,
                    lastname,
                    email,
                    password: hashedPassword,
                    type: userTypes.USER,
                    status: userStatus.ACTIVE,
                },
            });
            const responseBody = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
            };
            return res.status(201).json({
                message: 'User created successfully',
                user: responseBody,
            });
        } else {
            throw Errors.userAlreadyExists;
        }
    } catch (error) {
        next(error);
    }
};
