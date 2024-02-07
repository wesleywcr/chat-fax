import type { ISignIn } from '@dto/authDTO';
import type { UserDTO } from '@dto/userDTO';
import { pb } from '@lib/pocketbase';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

export type AuthContextProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (data: ISignIn) => Promise<void>;
  getUserInfo: (userID: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: (userID: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);
  //  const isLogged = pb.authStore.isValid;

  async function storageUserAndTokenSave(userData: UserDTO, tokenAuth: string) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token: tokenAuth });
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(data: ISignIn) {
    try {
      const userLogged = await pb
        .collection('users')
        .authWithPassword(data.email, data.password);

      if (userLogged) {
        setIsLoadingUserStorageData(true);
        setUser(userLogged.record as UserDTO);

        await storageUserAndTokenSave(
          userLogged.record as UserDTO,
          userLogged.token,
        );
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function getUserInfo(userID: string) {
    try {
      const response = await pb.collection('users').getOne(userID);

      setIsLoadingUserStorageData(true);
      setUser(response as UserDTO);
      const { token } = await storageAuthTokenGet();
      await storageUserAndTokenSave(response as UserDTO, token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  async function signOut() {
    try {
      pb.authStore.clear();
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  async function deleteAccount(userID: string) {
    try {
      console.log('USer', userID);
      const response = await pb.collection('users').delete(userID);
      console.log('res', response);
      signOut();
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        setIsLoadingUserStorageData(true);
        setUser(userLogged);

        await storageUserAndTokenSave(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        getUserInfo,
        signOut,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
