import { Router } from 'express';
import { signInControllerFactory } from '~/main/factories/controllers/sign-in/sign-in-controller-factory';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const signInRoutes = Router();

const { signInController } = signInControllerFactory();

signInRoutes.post('/', expressRouteAdapter(signInController));
