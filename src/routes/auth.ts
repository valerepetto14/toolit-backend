import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { signInSchema, signInGoogleSchema, signUpSchema } from '../utils/validations/auth';

const Auth = Router();

Auth.post('/signin', validateBody(signInSchema), signIn);
Auth.post('/signin/google', validateBody(signInGoogleSchema), signIn);
Auth.post('/signup', validateBody(signUpSchema), signUp);

export default Auth;
