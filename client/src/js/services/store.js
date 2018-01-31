import log from '../utils/log';

export default function store (reducer, initialState = {}) {
  const listeners = [];
  let state = initialState;

  const getState = () => state;

  const dispatch = (action) => {
    log('*PREV STATE*', state);

    if (typeof action === 'function') return action({getState, dispatch});

    log(`*DISPATCH ${action.type}*`, action);

    state = Object.keys(reducer).reduce((acc, type) => {
      const fn = reducer[type];

      acc[type] = fn(state[type], action);

      return acc;
    }, {}) || {};

    log('*NEXT STATE*', state);

    listeners.forEach(listener => {
      listener(state);
    });
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return {getState, dispatch, subscribe};
}
