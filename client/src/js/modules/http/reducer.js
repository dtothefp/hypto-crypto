import {http as actions} from '../action-types';

export default function (state = {}, action = {}) {
  const {type, data, message} = action;
  let newState;

  switch (type) {
    case actions.PENDING:
      newState = Object.assign({}, state, {status: 'pending'});
      break;
    case actions.SUCCESS:
      newState = Object.assign({}, state, {status: 'success', data});

      if (!state.groups) {
        const groups = Object.keys(data).reduce((acc, key) => {
          const [prefix, suffix] = key.split('_');

          if (!acc[prefix]) {
            acc[prefix] = [];
          }

          acc[prefix].push(suffix);

          return acc;
        }, {});

        Object.assign(newState, {groups});
      }
      break;
    case actions.ERROR:
      newState = Object.assign({}, state, {status: 'error', message});
      break;
  }

  return newState || state;
}
