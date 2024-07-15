import { string } from 'zod';

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = LoginUser & {
  name: string;
};

interface UserSub {
  name: string;
  email: string;
  password: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface User extends UserSub {}
