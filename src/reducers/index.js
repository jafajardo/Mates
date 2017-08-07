import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import feedReducer from './reducers_feeds';
import userReducer from './reducers_user';
import matesReducer from './reducers_mates';

export default combineReducers({
  form: formReducer,
  state_feed: feedReducer,
  state_user: userReducer,
  state_mates: matesReducer
});