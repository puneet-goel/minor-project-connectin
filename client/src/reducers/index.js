import { combineReducers } from 'redux';
import posts from './posts';
import profile from './profile';
import users from './users';
import category from './category';

export default combineReducers({
  posts,
  users,
  profile,
  category,
});
