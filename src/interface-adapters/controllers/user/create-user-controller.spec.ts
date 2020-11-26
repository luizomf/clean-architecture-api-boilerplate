/* eslint-disable @typescript-eslint/no-explicit-any */

import { Presenter } from '~/application/ports/presenters/presenter';
import { CreateUserRequestValidationComposite } from '~/interface-adapters/validation/user/composites/create-user-request-validation-composite';
import { EmailValidationError } from '~/domain/email/errors/email-validation-error';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { ResponseModel } from '~/domain/ports/responses/response-model';
import { CreateUserRequestWithPasswordString } from '~/domain/user/models/create-user-request-model';
import { CreateUserUseCase } from '~/domain/user/use-cases/create-user-use-case';
import { User } from '~/domain/user/entities/user';
import { CreateUserController } from './create-user-controller';
import { EmailValidatorAdapter } from '~/common/adapters/validators/email-validator-adapter';

const sutFactory = () => {
  const createUserUseCaseMock = createUserUseCaseMockFactory();
  const emailValidator = new EmailValidatorAdapter();
  const userRequestValidationComposite = new CreateUserRequestValidationComposite(
    emailValidator,
  );
  const createSuccessPresenterMock = createSuccessPresenterMockFactory();
  const sut = new CreateUserController(
    createUserUseCaseMock,
    userRequestValidationComposite,
    createSuccessPresenterMock,
  );

  return {
    sut,
    createSuccessPresenterMock,
    userRequestValidationComposite,
    createUserUseCaseMock,
  };
};

const createUserUseCaseMockFactory = () => {
  class CreateUserUseCaseMock implements CreateUserUseCase {
    async create(
      _userData: CreateUserRequestWithPasswordString,
    ): Promise<User> {
      return userResponseModelFactory();
    }
  }

  return new CreateUserUseCaseMock();
};

const createSuccessPresenterMockFactory = () => {
  class CreateSuccessPresenterMock implements Presenter<User> {
    async response(): Promise<ResponseModel<User>> {
      return {
        statusCode: 200,
        body: userResponseModelFactory(),
      };
    }
  }

  return new CreateSuccessPresenterMock();
};

const userResponseModelFactory = () => {
  return {
    id: '1',
    email: 'an_email@email.com',
    first_name: 'first_name',
    last_name: 'last_name',
  };
};

const createRequestMock = () => {
  return {
    body: {
      email: 'an_email@email.com',
      first_name: 'first_name',
      last_name: 'last_name',
      password: 'password',
      confirmPassword: 'password',
    },
  };
};

describe('Create User Controller', () => {
  it('should call validation with correct values', async () => {
    const { sut, userRequestValidationComposite } = sutFactory();
    const validation = jest.spyOn(userRequestValidationComposite, 'validate');
    await sut.handleRequest(createRequestMock());
    expect(validation).toHaveBeenCalledTimes(1);
    expect(validation).toHaveBeenCalledWith(createRequestMock());
  });

  it('should validate request body', async () => {
    const { sut } = sutFactory();
    const request = {};
    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing body'));
  });

  it('should validate user request first_name', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    delete request.body.first_name;

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing first_name'));

    request.body.first_name = '';

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing first_name'));
  });

  it('should validate user request last_name', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    delete request.body.last_name;

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing last_name'));

    request.body.last_name = '';

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing last_name'));
  });

  it('should validate user request email', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    delete request.body.email;

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing email'));

    request.body.email = '';

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing email'));
  });

  it('should validate user request password', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    delete request.body.password;

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing password'));

    request.body.password = '';

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new RequestValidationError('Missing password'));
  });

  it('should validate user request confirmPassword', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    delete request.body.confirmPassword;

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Missing confirmPassword'),
    );

    request.body.confirmPassword = '';

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Missing confirmPassword'),
    );
  });

  it('should throw if password and confirmPassword do not match', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    request.body.password = 'a_password';
    request.body.confirmPassword = 'another_password';

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new RequestValidationError('Password and confirmPassword must match'),
    );
  });

  it('should throw if user email is invalid', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock() as any;
    request.body.email = 'abc';

    let error;

    try {
      await sut.handleRequest(request);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new EmailValidationError('E-mail not valid'));
  });

  it('should create user if everything is OK', async () => {
    const { sut } = sutFactory();
    const request = createRequestMock();
    const createdUser = await sut.handleRequest(request);

    const requestedUser = {
      id: '1',
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
    };

    expect(createdUser.body).toEqual(requestedUser);
  });
});
