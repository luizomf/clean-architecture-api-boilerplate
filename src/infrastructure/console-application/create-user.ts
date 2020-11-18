import { createUserControllerFactory } from '../factories/user/create-user-controller-factory';

const createUserController = createUserControllerFactory();

createUserController
  .handleRequest({
    body: {
      email: 'email@email.com',
      first_name: 'name',
      last_name: 'lastname',
      password: 'password',
      confirmPassword: 'password',
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
    // console.log(error.stack);
  });
