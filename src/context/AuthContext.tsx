/* eslint-disable react-hooks/exhaustive-deps */
import type { ISignIn } from 'dto/authDTO';
import type { UserDTO } from 'dto/userDTO';
import { pb } from 'lib/pocketbase';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from 'storage/storageToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from 'storage/storageUser';

export type AuthContextProps = {
  user: UserDTO;
  signIn: (data: ISignIn) => Promise<void>;
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
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
  // const isLogged = pb.authStore.isValid;

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token });
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
        setUser(userLogged.record);
        await storageUserAndTokenSave(userLogged.record, userLogged.token);
      }
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
