import { Router } from 'express';
import { createUserControllerFactory } from '~/main/factories/user/create-user-controller-factory';
import { deleteUserByIdControllerFactory } from '~/main/factories/user/delete-user-by-id-controller-factory';
import { findAllUsersControllerFactory } from '~/main/factories/user/find-all-users-controller-factory';
import { findUserByIdControllerFactory } from '~/main/factories/user/find-user-by-id-controller-factory';
import { updateUserControllerFactory } from '~/main/factories/user/update-user-controller-factory';
import { MiddlewareExample } from '~/presentation/middlewares/simple-example/example';
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();
const { deleteUserByIdController } = deleteUserByIdControllerFactory();
const { updateUserController } = updateUserControllerFactory();
const { findAllUsersController } = findAllUsersControllerFactory();

userRoutes.get(
  '/:id',
  expressMiddlewareAdapter(new MiddlewareExample()),
  expressRouteAdapter(findUserByIdController),
);
userRoutes.get('/', expressRouteAdapter(findAllUsersController));
userRoutes.post('/', expressRouteAdapter(createUserController));
userRoutes.delete('/:id', expressRouteAdapter(deleteUserByIdController));
userRoutes.put('/:id', expressRouteAdapter(updateUserController));
