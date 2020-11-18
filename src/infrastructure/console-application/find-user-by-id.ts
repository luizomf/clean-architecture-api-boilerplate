// This is just for simulation (eliminating express)
import { findUserByIdControllerFactory } from '../factories/user/find-user-by-id-controller-factory';

const { findUserByIdController } = findUserByIdControllerFactory();

findUserByIdController
  .handleRequest({
    params: {
      id: '1',
    },
  })
  .then((user) => console.log(user))
  .catch((error) => console.log(error));

findUserByIdController
  .handleRequest({
    params: {
      id: '4',
    },
  })
  .then((user) => console.log(user))
  .catch((error) => console.log(error));
