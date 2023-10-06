import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const signUpSchema = z.object({
    name: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signInGoogleSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    lastname: z.string().min(3),
    googleId: z.string().min(3),
    imageUrl: z.string().min(3),
});
