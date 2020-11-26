import { BadRequestError } from '~/application/errors/bad-request-error';
import { User } from '~/domain/user/entities/user';
import { ValidationComposite } from '~/application/ports/validation/validation-composite';
import { FindUserByIdController } from './find-by-id-controller';
import { Presenter } from '~/application/ports/presenters/presenter';
import { ResponseModel } from '~/application/ports/responses/response-model';
import { FindUserByIdUseCase } from '~/domain/user/use-cases/find-user-by-id-use-case';

const sutFactory = () => {
  const findUserByIdUseCaseMock = findUserUseCaseMockFactory();
  const userValidationCompositeMock = userValidationCompositeMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new FindUserByIdController(
    findUserByIdUseCaseMock,
    userValidationCompositeMock,
    presenterMock,
  );

  return {
    sut,
    findUserByIdUseCaseMock,
    userValidationCompositeMock,
    presenterMock,
  };
};

const presenterMockFactory = () => {
  class PresenterMock implements Presenter<User> {
    async response(): Promise<ResponseModel<User>> {
      return {
        statusCode: 200,
        body: userMockFactory()[0],
      };
    }
  }

  return new PresenterMock();
};

const userValidationCompositeMockFactory = () => {
  class UserValidationCompositeMock extends ValidationComposite {
    async validate(): Promise<void> {}
  }

  return new UserValidationCompositeMock();
};

const findUserUseCaseMockFactory = () => {
  class FindUserByIdUseCaseMock implements FindUserByIdUseCase {
    async findById(_id: string): Promise<User> {
      return userMockFactory()[0];
    }
  }

  const findUserByIdUseCaseMock = new FindUserByIdUseCaseMock();
  return findUserByIdUseCaseMock;
};

const userMockFactory = (): User[] => {
  return [
    {
      id: '1',
      email: 'user@email.com',
      first_name: 'user first name',
      last_name: 'user last name',
    },
  ];
};

const responseModelMockFactory = () => {
  return {
    statusCode: 200,
    body: userMockFactory()[0],
  };
};

describe('FindUserByIdController', () => {
  it('should call user validation', async () => {
    const { sut, userValidationCompositeMock } = sutFactory();
    const validation = jest.spyOn(userValidationCompositeMock, 'validate');
    await sut.handleRequest({ params: { id: '1' } });
    expect(validation).toHaveBeenCalledTimes(1);
  });

  it('should reject with BadRequestError if request is empty', async () => {
    const { sut, userValidationCompositeMock } = sutFactory();
    jest
      .spyOn(userValidationCompositeMock, 'validate')
      .mockImplementationOnce(async () => {
        throw new BadRequestError('Missing params');
      });
    await sut
      .handleRequest({})
      .catch((e) => expect(e).toEqual(new BadRequestError('Missing params')));
  });

  it('should reject with BadRequestError if id is empty', async () => {
    const { sut, userValidationCompositeMock } = sutFactory();
    jest
      .spyOn(userValidationCompositeMock, 'validate')
      .mockImplementationOnce(async () => {
        throw new BadRequestError('Missing user id');
      });
    await sut
      .handleRequest({ params: {} })
      .catch((e) => expect(e).toEqual(new BadRequestError('Missing user id')));
  });

  it('should return a user if found', async () => {
    const { sut, findUserByIdUseCaseMock, presenterMock } = sutFactory();
    const userMock = userMockFactory()[0];
    const responseModelMock = responseModelMockFactory();

    jest
      .spyOn(findUserByIdUseCaseMock, 'findById')
      .mockResolvedValueOnce(userMock);
    jest
      .spyOn(presenterMock, 'response')
      .mockResolvedValueOnce(responseModelMock);

    const request = { params: { id: '1' } };
    const response = await sut.handleRequest(request);
    expect(response.body).toEqual(userMock);
    expect(response.statusCode).toBe(200);
  });

  it('should call findUserById usecase', async () => {
    const { sut, findUserByIdUseCaseMock } = sutFactory();
    const usecase = jest.spyOn(findUserByIdUseCaseMock, 'findById');
    const request = { params: { id: '1' } };
    await sut.handleRequest(request);
    expect(usecase).toHaveBeenCalledTimes(1);
    expect(usecase).toHaveBeenCalledWith('1');
  });
});
