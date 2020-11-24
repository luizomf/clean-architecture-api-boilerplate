import { Router } from 'express';
import { createUserControllerFactory } from '~/infrastructure/factories/user/create-user-controller-factory';
import { deleteUserByIdControllerFactory } from '~/infrastructure/factories/user/delete-user-by-id-controller-factory';
import { findUserByIdControllerFactory } from '~/infrastructure/factories/user/find-user-by-id-controller-factory';
import { expressRouteAdapter } from '../utils/express-route-adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();
const { deleteUserByIdController } = deleteUserByIdControllerFactory();

userRoutes.get('/:id', expressRouteAdapter(findUserByIdController));
userRoutes.post('/', expressRouteAdapter(createUserController));
userRoutes.delete('/:id', expressRouteAdapter(deleteUserByIdController));
