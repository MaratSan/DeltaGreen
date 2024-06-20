import { getRandomNumber } from "../helpers";

export interface User {
    username: string;
    password: string;
  }

  export const standardUserCredentials: User = {
    username: process.env.USERNAME ?? '',
    password: process.env.PASSWORD ?? '',
  };

  export const randomdUserCredentials: User = {
    username: `${process.env.USERNAME ?? ''}${getRandomNumber()}`,
    password: process.env.PASSWORD ?? '',
  };
