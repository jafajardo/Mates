import { createSelector } from 'reselect';

const matesSelector = state_mates => state_mates.mates;
const mateRequestsSelector = state_mates => state_mates.mateRequests;

const getMatesFromMateRequests = (mates, mateRequests) => {
  const matchedMates = mates.filter(mate => {
    return mateRequests.includes(mate._id);
  })

  return matchedMates;
}

export default createSelector(
  matesSelector,
  mateRequestsSelector,
  getMatesFromMateRequests
);