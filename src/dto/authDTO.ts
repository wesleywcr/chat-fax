export type ISignIn = {
  email: string;
  password: string;
};
export type ISignUp = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar?: string;
  username?: string;
};
