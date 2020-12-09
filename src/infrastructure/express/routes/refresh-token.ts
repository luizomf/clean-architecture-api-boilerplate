import { Router } from 'express';
import { refreshUserControllerFactory } from '~/main/factories/controllers/token/refresh-token-controller-factory';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const refreshTokenRoutes = Router();

const { refreshTokenController } = refreshUserControllerFactory();

refreshTokenRoutes.post('/', expressRouteAdapter(refreshTokenController));
