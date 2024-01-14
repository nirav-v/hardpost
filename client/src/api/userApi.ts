import Auth from '../util/auth';
import { endpoints } from './endpoints';
import { LoginBodyType, SignUpBodyType } from './endpoints';

export const userApi = {
  signUp: async (body: SignUpBodyType) => {
    try {
      const { url, options } = endpoints.signup;
      const response = await fetch(url, options(body));
      return response.status === 201 ? response.json() : null;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (body: LoginBodyType) => {
    const { url, options } = endpoints.login;
    try {
      const response = await fetch(url, options(body));
      if (response.status === 200) return response.json();
      else return null;
    } catch (error) {
      console.log(error);
    }
  },

  getUserItems: async () => {
    try {
      const response = await fetch('/api/get-items', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      if (response.status === 200) return response.json();
      else return null;
    } catch (error) {
      console.error(error);
    }
  },

  logout: async () => {},
};
