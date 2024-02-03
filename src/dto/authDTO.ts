export type ISignIn = {
  email: string;
  password: string;
};
export type ISignUp = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  dateOfBirth: string;
  phone: string;
  avatar?: string;
  username: string;
};
export type IProfile = {
  name: string;
  username: string;
  dateOfBirth: string;
  phone: string;
};
