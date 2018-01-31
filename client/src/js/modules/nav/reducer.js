import {nav as actions} from '../action-types';

export default function (state = {}, action = {}) {
  const {type, data, item} = action;
  let newState;

  switch (type) {
    case actions.SET:
      const items = Object.keys(data).reduce((list, key) => {
        const [prefix] = key.split('_');

        if (!list.includes(prefix)) {
          list.push(prefix);
        }

        return list;
      }, []);

      newState = Object.assign({}, state, {items, selected: items[0]});
      break;
    case actions.SELECT:
      newState = Object.assign({}, state, {selected: item});
      break;
  }

  return newState || state;
}
