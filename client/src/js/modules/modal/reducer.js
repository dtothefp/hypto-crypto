import {modal as actions} from '../action-types';

export default function (state = {}, action = {}) {
  const {type, item} = action;
  let newState;

  switch (type) {
    case actions.OPEN:
      newState = Object.assign({}, state, {
        active: true,
        item
      });
      break;
    case actions.CLOSE:
      newState = Object.assign({}, state, {
        active: false,
        item
      });
      break;
  }

  return newState || state;
}
