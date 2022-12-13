import { UPDATE_CATEGORY, UPDATE_PHOTOS } from '../constants/actionTypes';
import * as api from '../api';
import { findToken } from '../utility/index.js';

// Action Creators
export const updatePhotos = (category) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      throw new Error('Not authorized');
    }

    const { data } = await api.fetchCategoryPhotos(category, token);
    if (data.message === 'ok') {
      dispatch({
        type: UPDATE_PHOTOS,
        payload: {
          category: category,
          photos: data.photos,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateCategory = (category) => (dispatch) => {
  dispatch({
    type: UPDATE_CATEGORY,
    payload: category,
  });
};
