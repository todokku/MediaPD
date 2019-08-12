import { combineReducers } from 'redux';
import products from './products';
import release from './release';

export default combineReducers({
  products,
  release
});
