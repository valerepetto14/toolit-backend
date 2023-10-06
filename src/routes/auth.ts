import { Router } from 'express';
import { signIn, signUp, signInWithGoogle } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { isUserLogged } from '../middlewares/auth';
import { signInSchema, signInGoogleSchema, signUpSchema } from '../utils/validations/auth';
import { returnUser } from '../controllers/user';

const Auth = Router();

Auth.post('/signin', validateBody(signInSchema), signIn);
Auth.post('/signin/google', validateBody(signInGoogleSchema), signInWithGoogle);
Auth.post('/signup', validateBody(signUpSchema), signUp);
Auth.get('/verify', isUserLogged, returnUser);
export default Auth;
