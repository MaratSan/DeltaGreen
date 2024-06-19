export interface User {
    username: string;
    password: string;
  }

  export const standardUserCredentials: User = {
    username: process.env.USERNAME ?? '',
    password: process.env.PASSWORD ?? '',
  };
