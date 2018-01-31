import {http as actions} from '../action-types';

export default function (state = {}, action = {}) {
  const {type, data, message} = action;
  let newState;

  switch (type) {
    case actions.PENDING:
      newState = Object.assign({}, state, {status: 'pending'});
      break;
    case actions.SUCCESS:
      newState = {status: 'success', data};
      break;
    case actions.ERROR:
      newState = {status: 'error', message};
      break;
  }

  return newState || state;
}
