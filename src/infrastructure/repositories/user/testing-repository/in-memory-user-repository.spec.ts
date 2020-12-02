/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRequestWithPasswordHash } from '~/domain/models/user/user-request-required-fields';
import { InMemoryUserRepository } from './in-memory-user-repository';

const sut = new InMemoryUserRepository();

const sampleDataFactory = (): UserRequestWithPasswordHash[] => {
  return [
    {
      first_name: 'user firstname 1',
      last_name: 'user lastname 1',
      email: 'user1@email.com',
      password_hash: 'hash1',
    },
    {
      first_name: 'user firstname 2',
      last_name: 'user lastname 2',
      email: 'user2@email.com',
      password_hash: 'hash2',
    },
    {
      first_name: 'user firstname 3',
      last_name: 'user lastname 3',
      email: 'user3@email.com',
      password_hash: 'hash3',
    },
  ];
};

describe('InMemoryRepository', () => {
  beforeEach(() => {
    sut.clear();
  });

  it('should add users', async () => {
    const newUserData = sampleDataFactory()[0];
    const expectedUser = { ...newUserData, id: '1' };

    await sut.create(newUserData);
    return sut.findById('1').then((user) => {
      return expect(user).toEqual(expectedUser);
    });
  });

  it('should throw if user id already exists', async () => {
    const newUserData = sampleDataFactory()[0];
    await sut.create(newUserData);

    return sut
      .create(newUserData)
      .catch((error) =>
        expect(error).toEqual(new Error('User ID already exists')),
      );
  });

  it('should create user ids automatically', async () => {
    const addedUser1 = await sut.create(sampleDataFactory()[0]);
    const addedUser2 = await sut.create(sampleDataFactory()[0]);
    const addedUser3 = await sut.create(sampleDataFactory()[0]);

    expect(addedUser1.id).toEqual('1');
    expect(addedUser2.id).toEqual('2');
    expect(addedUser3.id).toEqual('3');

    return sut
      .create(sampleDataFactory()[0])
      .catch((error) =>
        expect(error).toEqual(new Error('User ID already exists')),
      );
  });

  it('should find all entries in asc or desc order', async () => {
    const sampleData = sampleDataFactory();

    sut.createMany(...sampleData);
    let users = await sut.find();
    let first = users[0];
    expect(first).toEqual({ ...sampleData[0], id: '1' });

    users = await sut.find('desc');
    first = users[0];
    expect(first).toEqual({ ...sampleData.slice(-1)[0], id: '3' });
  });

  it('should delete by id', async () => {
    const user = await sut.create(sampleDataFactory()[0]);

    const deleted = await sut.deleteById(user.id);
    expect(deleted).toBe(1);

    const existingUserDeleted = await sut.findById(user.id);
    expect(existingUserDeleted).toBeNull();

    const notExistingUserDeleted = await sut.deleteById('anyID');
    expect(notExistingUserDeleted).toBe(0);
  });

  it('should return a user by email if found', async () => {
    const user = sampleDataFactory()[2];
    await sut.create(user);
    return sut.findByEmail(user.email).then((response) => {
      return expect(response).toBeTruthy();
    });
  });

  it('should return null if email not found', async () => {
    const user = sampleDataFactory()[2];
    return sut.findByEmail(user.email).then((response) => {
      return expect(response).toBeNull();
    });
  });

  it('should update a user if it exists', async () => {
    await sut.create({
      first_name: 'l',
      last_name: 'l',
      email: 'e',
      password_hash: 'h',
    });
    await sut.update('1', { first_name: 'luiz321' });
    const updated = (await sut.findById('1')) as any;
    expect(updated.first_name).toBe('luiz321');
  });

  it('should NOT update user if it does not exist', async () => {
    const updatedRows = await sut.update('abc', { first_name: 'luiz321' });
    expect(updatedRows).toBe(0);
  });
});
