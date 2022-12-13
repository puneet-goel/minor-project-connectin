import {
  GET_ALL_USERS,
  UPDATE_FOLLOW_USER_FOR_USERS,
} from '../constants/actionTypes';

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    case UPDATE_FOLLOW_USER_FOR_USERS:
      return users.map((user) => {
        if (user._id === action.payload._id) {
          return {
            ...user,
            following: action.payload.following,
          };
        }
        return user;
      });
    default:
      return users;
  }
};

export default usersReducer;
