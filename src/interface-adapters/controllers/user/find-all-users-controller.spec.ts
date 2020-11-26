import { GenericSuccessPresenter } from '~/interface-adapters/presenters/responses/generic/generic-success-presenter';
import { FindAllUsersUseCase } from '~/domain/user/use-cases/find-all-users-use-case';
import { ValidationComposite } from '~/domain/ports/validation/validation-composite';
import { User } from '~/domain/user/entities/user';
import { FindAllUsersController } from './find-all-users-controller';

const sutFactory = () => {
  const findAllUsersUseCaseMock = findAllUsersUseCaseMockFactory();
  const findAllUsersValidationMock = findAllUsersValidationMockFactory();
  const genericSuccessPresenter = new GenericSuccessPresenter<User[]>();
  const sut = new FindAllUsersController(
    findAllUsersUseCaseMock,
    findAllUsersValidationMock,
    genericSuccessPresenter,
  );

  return {
    sut,
    findAllUsersUseCaseMock,
    findAllUsersValidationMock,
    genericSuccessPresenter,
  };
};

const findAllUsersValidationMockFactory = () => {
  class FindAllUsersValidationMock extends ValidationComposite {
    async validate(_any: unknown) {}
  }

  return new FindAllUsersValidationMock();
};

const findAllUsersUseCaseMockFactory = () => {
  class FindAllUsersUseCaseMock implements FindAllUsersUseCase {
    async findAll() {
      return [];
    }
  }

  return new FindAllUsersUseCaseMock();
};

describe('FindAllUsersController', () => {
  it('should call validation with correct values', async () => {
    const { sut, findAllUsersValidationMock } = sutFactory();
    const findAllUsersValidationSpy = jest.spyOn(
      findAllUsersValidationMock,
      'validate',
    );

    await sut.handleRequest({ query: { order: 'desc', limit: 10, offset: 2 } });
    expect(findAllUsersValidationSpy).toHaveBeenCalledTimes(1);

    expect(findAllUsersValidationSpy).toHaveBeenCalledWith({
      query: { order: 'desc', limit: 10, offset: 2 },
    });

    await sut.handleRequest({ query: { limit: 10, offset: 2 } });
    expect(findAllUsersValidationSpy).toHaveBeenCalledWith({
      query: { limit: 10, offset: 2 },
    });

    await sut.handleRequest({ query: { offset: 2 } });
    expect(findAllUsersValidationSpy).toHaveBeenCalledWith({
      query: { offset: 2 },
    });

    await sut.handleRequest({ query: {} });
    expect(findAllUsersValidationSpy).toHaveBeenCalledWith({
      query: {},
    });
  });

  it('should call use case with correct values', async () => {
    const { sut, findAllUsersUseCaseMock } = sutFactory();
    const findAllUsersUseCaseSpy = jest.spyOn(
      findAllUsersUseCaseMock,
      'findAll',
    );
    await sut.handleRequest({ query: { order: 'desc', limit: 10, offset: 2 } });
    expect(findAllUsersUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(findAllUsersUseCaseSpy).toHaveBeenCalledWith('desc', 10, 2);
  });
});
