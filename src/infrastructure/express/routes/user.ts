import { Router } from 'express';
import { createUserControllerFactory } from '~/main/factories/controllers/user/create-user-controller-factory';
import { deleteUserByIdControllerFactory } from '~/main/factories/controllers/user/delete-user-by-id-controller-factory';
import { findAllUsersControllerFactory } from '~/main/factories/controllers/user/find-all-users-controller-factory';
import { findUserByIdControllerFactory } from '~/main/factories/controllers/user/find-user-by-id-controller-factory';
import { updateUserControllerFactory } from '~/main/factories/controllers/user/update-user-controller-factory';
import { isAuthenticatedMiddlewareFactory } from '~/main/factories/middlewares/authentication/is-authenticated';
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const userRoutes = Router();

// Controllers
const { createUserController } = createUserControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();
const { deleteUserByIdController } = deleteUserByIdControllerFactory();
const { updateUserController } = updateUserControllerFactory();
const { findAllUsersController } = findAllUsersControllerFactory();

// Middlewares
const { isAuthenticatedMiddleware } = isAuthenticatedMiddlewareFactory();

// Routes with authorization
userRoutes.get(
  '/:id',
  expressMiddlewareAdapter(isAuthenticatedMiddleware),
  expressRouteAdapter(findUserByIdController),
);

userRoutes.get(
  '/',
  expressMiddlewareAdapter(isAuthenticatedMiddleware),
  expressRouteAdapter(findAllUsersController),
);

userRoutes.delete(
  '/:id',
  expressMiddlewareAdapter(isAuthenticatedMiddleware),
  expressRouteAdapter(deleteUserByIdController),
);

userRoutes.put(
  '/:id',
  expressMiddlewareAdapter(isAuthenticatedMiddleware),
  expressRouteAdapter(updateUserController),
);

// Public routes
userRoutes.post('/', expressRouteAdapter(createUserController));
