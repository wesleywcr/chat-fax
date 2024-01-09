import type { UserDTO } from './userDTO';

export type MessagesDTO = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  relation: string;
  text: string;
  updated: string;
};

export type IDataMessages = {
  title: string;
  data: IListMessages[];
};
export type IListMessages = {
  id: string;
  from: string;
  to: string;
  message: string;
  status: number;
  created_at: string;
};

export type ILastMessages = {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: { to: UserDTO; from: UserDTO };
  from: string;
  id: string;
  status: number;
  text: string;
  to: string;
  updated: string;
  user: string;
};
