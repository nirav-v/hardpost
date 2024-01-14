import { Item } from '../types/ItemTypes';
import Auth from '../util/auth';

export type LoginBodyType = {
  email: string;
  password: string;
  cart: Item[];
};

export type SignUpBodyType = LoginBodyType & { username: string };

const createFetchOptions = (body: LoginBodyType) => {
  return {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json', // tells server that data is in json format
    },
  };
};

export const endpoints = {
  login: {
    url: 'api/user/login',
    options: (body: LoginBodyType) => createFetchOptions(body),
  },

  signup: {
    url: 'api/user/signup',
    options: (body: SignUpBodyType) => createFetchOptions(body),
  },

  addItem: {
    url: '/api/add-item',
    options: (body: FormData) => {
      return {
        method: 'POST',
        body: body,
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      };
    },
  },
};
