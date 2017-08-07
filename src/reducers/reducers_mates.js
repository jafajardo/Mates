import {
  GET_MATES,
  GET_MATE,
  GET_MATE_REQUESTS,
  GET_MY_MATES
} from '../actions/types';

const INITIAL_STATE = {
  logged_in_mate: {},
  mates: [],
  mateRequests: [],
  my_mates: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MATES: {
      return { ...state, mates: action.payload }
    }
    case GET_MATE: {
      return { ...state, logged_in_mate: action.payload }
    }
    case GET_MATE_REQUESTS: {
      return { ...state, mateRequests: action.payload }
    }
    case GET_MY_MATES: {
      return { ...state, my_mates: action.payload }
    }
  }

  return state;
}