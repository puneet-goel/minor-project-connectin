import * as api from '../api';
import {
  FOLLOW_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOW_USER_FOR_USERS,
  UPDATE_PROFILE,
} from '../constants/actionTypes';
import { findToken } from '../utility/index.js';
//Action Creators

export const getAllUsers = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const { data } = await api.getAllUsers(token);
    if (data.message === 'ok') {
      dispatch({
        type: GET_ALL_USERS,
        payload: data.users,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const followUser = (whomToFollow, profile) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const { data } = await api.followUser(
      {
        whomToFollow: whomToFollow,
        id: profile._id,
      },
      token
    );

    if (data.message === 'ok') {
      dispatch({
        type: FOLLOW_USER,
        payload: data.updatedUser,
      });

      dispatch({
        type: UPDATE_FOLLOW_USER_FOR_USERS,
        payload: data.updatedUser,
      });
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const updateProfile = (id, userFile) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const formData = new FormData();
    formData.append('selectedFile', userFile);

    const { data } = await api.updateProfile(id, formData, token);

    if (data.message === 'ok') {
      dispatch({
        type: UPDATE_PROFILE,
        payload: data.user,
      });

      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};
