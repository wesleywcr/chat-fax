import type { UserDTO } from '@dto/userDTO';

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from './storageToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from './storageUser';

const token = '91f37b22-93db-11ee-b9d1-0242ac120002';
const user: UserDTO = {
  id: '1',
  collectionId: '1',
  collectionName: 'users',
  username: 'jonh',
  verified: false,
  emailVisibility: true,
  email: 'jonh@test.com',
  created: '2022-01-04 10:00:00.123Z',
  updated: '2022-01-04 10:00:00.123Z',
  name: 'Jonh',
  dateOfBirth: '2000-06-06 10:00:00.123Z',
  phone: '9999999999',
  avatar: 'avatar.png',
};

describe('Storage: User', () => {
  it("should be return empty when don't have a user storaged", async () => {
    const response = await storageUserGet();
    expect(response).toEqual({});
    expect(Object.keys(response).length).toBe(0);
  });

  it('should be return user storaged.', async () => {
    await storageUserSave(user);
    const response = await storageUserGet();
    expect(response).toEqual(user);
  });
  it('should be removed user.', async () => {
    await storageUserSave(user);
    await storageUserRemove();
    const response = await storageUserGet();
    expect(response).toEqual({});
    expect(Object.keys(response).length).toBe(0);
  });
});

describe('Storage: Token', () => {
  it("should be return token don't have a token storaged.", async () => {
    const response = await storageAuthTokenGet();
    expect(response.token).toBeUndefined();
  });

  it('should be return token storaged.', async () => {
    await storageAuthTokenSave({ token });
    const response = await storageAuthTokenGet();
    expect(response).toEqual({ token });
  });
  it('should be removed token.', async () => {
    await storageAuthTokenSave({ token });
    await storageAuthTokenRemove();
    const response = await storageAuthTokenGet();
    expect(response.token).toBeUndefined();
  });
});
