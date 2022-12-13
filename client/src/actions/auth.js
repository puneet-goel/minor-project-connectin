import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  AUTHORIZE,
} from '../constants/actionTypes';
import * as api from '../api';
import { findToken } from '../utility/index.js';

export const login = (email, password, username, check) => async (dispatch) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await api.loginUser(user);

    if (data.message === 'ok') {
      //create a token cookie
      const d = new Date();
      var days = 1;
      if (check) {
        days = 30;
      }

      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = `token=${data.token}; ${expires}; path=/;`;

      localStorage.setItem('username', username);

      dispatch({
        type: LOGIN,
        payload: data.user,
      });
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const logout = () => async (dispatch) => {
  try {
    //delete the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();

    dispatch({
      type: LOGOUT,
      payload: null,
    });

    return;
  } catch (err) {
    console.error(err);
  }
};

export const register = (email, password, username) => async (dispatch) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await api.signupUser(user);
    if (data.message === 'ok') {
      dispatch({
        type: SIGNUP,
        payload: null,
      });
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const { data } = await api.forgotPasswordUser(email);
    if (data.message === 'ok') {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: null,
      });
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const resetPassword = (otp, email, password) => async (dispatch) => {
  try {
    const user = {
      otp: otp,
      password: password,
      email: email,
    };

    const { data } = await api.resetPasswordUser(user);
    if (data.message === 'ok') {
      dispatch({
        type: RESET_PASSWORD,
        payload: null,
      });
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const authenticate = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const { data } = await api.authenticate(token);
    if (data.message === 'ok') {
      localStorage.setItem('username', data.user.username);

      dispatch({
        type: AUTHORIZE,
        payload: data.user,
      });

      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};
