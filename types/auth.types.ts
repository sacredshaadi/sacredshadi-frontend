export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = LoginUser & {
  name: string;
};
