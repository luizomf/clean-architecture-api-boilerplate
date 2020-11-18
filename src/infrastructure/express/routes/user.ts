import { Router } from 'express';
import { createUserControllerFactory } from '~/infrastructure/factories/user/create-user-controller-factory';
import { findUserByIdControllerFactory } from '~/infrastructure/factories/user/find-user-by-id-controller-factory';
import { expressRouteAdapter } from '../utils/express-route-adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();

userRoutes.get('/:id', expressRouteAdapter(findUserByIdController));
userRoutes.post('/', expressRouteAdapter(createUserController));
