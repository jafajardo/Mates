import {
  GET_FEEDS,
  ADD_COMMENT
} from '../actions/types';

const INITIAL_STATE = {
  feeds: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FEEDS: {
      return { ...state, feeds: [...action.payload] }
    }
    case ADD_COMMENT: {
      return { ...state, feeds: [ ...state.feeds, action.payload ] }
    }
  }

  return state;
}