export type UserDTO = {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified?: boolean;
  emailVisibility?: boolean;
  email: string;
  created: string;
  updated: string;
  name: string;
  avatar?: string;
};
export type IListContacts = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
};
