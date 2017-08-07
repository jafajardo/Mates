import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  GET_FEEDS,
  ADD_COMMENT,
  AUTH_USER,
  UNAUTH_USER,
  GET_MATES,
  GET_MATE,
  GET_MATE_REQUESTS,
  GET_MY_MATES
} from './types';

const AUTH_ENDPOINT = 'http://localhost:3092';
const MATES_SERVER_ENDPOINT = 'http://localhost:3091';

export const retrieveFeeds = () => {
  return dispatch => {
    const feeds = [
      {
        id: 1,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timestamp: '2017-07-31T06:08:47.478Z'
      },
      {
        id: 2,
        comment: 'Donec vitae molestie velit.',
        timestamp: '2017-07-31T06:14:14.524Z'
      },
      {
        id: 3,
        comment: 'Proin quis quam laoreet, aliquet neque vel, laoreet magna.',
        timestamp: '2017-07-31T06:14:50.713Z'
      },
      {
        id: 4,
        comment: 'Mauris facilisis felis in placerat ultrices.',
        timestamp: '2017-07-31T06:15:19.259Z'
      }
    ]

    dispatch({
      type: GET_FEEDS,
      payload: feeds
    });
  }
}

export const submitComment = (comment) => {
  const com = {
    id: Math.floor(Math.random() * 1000000),
    comment,
    timestamp: new Date().toJSON()
  }

  return dispatch => {
    dispatch({
      type: ADD_COMMENT,
      payload: com
    })
  }
}

export function getMates(id) {
  return dispatch => {
    axios.get(`${MATES_SERVER_ENDPOINT}/getMates`)
      .then(response => {
        const mateIndex = response.data.mates.findIndex(element => element._id === id);
        let mates = response.data.mates;

        if (mateIndex > -1) {
          mates = [ ...response.data.mates.slice(0, mateIndex), ...response.data.mates.slice(mateIndex + 1) ];
        }

        dispatch({
          type: GET_MATES,
          payload: mates
        })
      })
  }
}

export function addMateRequest({ requestedBy, mateRequest }) {
  return dispatch => {
    axios.post(`${MATES_SERVER_ENDPOINT}/addMateRequest`, { requestedBy, mateRequest })
      .then(response => {
        browserHistory.push('/addFriend');
      })
  }
}

export function getMateRequests(id) {
  return dispatch => {
    axios.post(`${MATES_SERVER_ENDPOINT}/getMateRequests`, { id })
      .then(response => {
        dispatch({
          type: GET_MATE_REQUESTS,
          payload: response.data.mateRequests
        })
      })
  }
}

export function approveMate(loggedID, approvedID) {
  console.log('Logged ID: ', loggedID);
  console.log('Approved ID: ', approvedID);
  return dispatch => {
    axios.post(`${MATES_SERVER_ENDPOINT}/approveMate`, { requestedBy: loggedID, approvedID })
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_MY_MATES,
          payload: response.data.myMates.mates
        })
      })
  }
}

////// AUTHENTICATION ACTIONS //////

export function signup({ name, email, password, hobby }) {
  return dispatch => {
    axios.post(`${AUTH_ENDPOINT}/signup`, { name, email, password})
      .then(response => {
        // Store token in LocalStorage
        localStorage.setItem('token', response.data.token);

        // Set authenticated boolean state to True
        dispatch({ type: AUTH_USER });
        
        axios.post(`${MATES_SERVER_ENDPOINT}/addMate`, { name, hobby })
          .then(res => {
            
            localStorage.setItem('id', res.data._id);

            const mate = {
              _id: res.data._id,
              name: res.data.mate.name,
              hobby: res.data.mate.hobby
            }

            dispatch({
              type: GET_MATE,
              payload: mate
            });

            // Redirect user to Home page
            browserHistory.push('/');
          })
      });
  }
}

export function signin({ email, password }) {
  return dispatch => {
    axios.post(`${AUTH_ENDPOINT}/signin`, {email, password})
      .then(response => {
        // Save token to LocalStorage.
        localStorage.setItem('token', response.data.token);

        // Set authenticated boolean to True
        dispatch({ type: AUTH_USER });
        axios.post(`${MATES_SERVER_ENDPOINT}/getMate`, { name: response.data.user.name })
          .then(mateResponse => {

            localStorage.setItem('id', mateResponse.data.mate._id);

            const mate = {
              _id: mateResponse.data.mate._id,
              name: mateResponse.data.mate.name,
              hobby: mateResponse.data.mate.hobby
            }

            dispatch({
              type: GET_MATE,
              payload: mate
            });
          })

        // Redirect user to Home page.
        browserHistory.push('/');
      });
  }
}

export function signout() {
  return dispatch => {
    // Remove token from LocalStorage.
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    // Set authenticated to False.
    dispatch({
      type: UNAUTH_USER
    });

    // Redirect user to Home page.
    browserHistory.push('/');
  }
}