import {modal} from '../action-types';

export const open = (item) => ({
  type: modal.OPEN,
  item
});

export const close = {
  type: modal.CLOSE
};

export const move = (direction) => {
  return ({getState, dispatch}) => {
    const state = getState();
    const {currency, modal} = state;
    const {groups} = currency;
    const {item} = modal;
    const [prefix, suffix] = item.split('_');
    const group = groups[prefix];
    const itemIdx = group.indexOf(suffix);
    const len = group.length - 1;
    let nextIdx;

    switch (direction) {
      case 'forward':
        nextIdx = itemIdx === len ? 0 : itemIdx + 1;
        break;
      case 'back':
        nextIdx = itemIdx === 0 ? len : itemIdx - 1;
        break;
    }

    if (!isNaN(nextIdx)) {
      const nextSymbol = `${prefix}_${group[nextIdx]}`;

      dispatch(open(nextSymbol));
    }
  };
};

export const init = ({getState, dispatch}) => {
  // TODO: add hash checking logic
  const {hash} = global.location || {};

  if (hash) {
    dispatch(open(hash));
  } else {
    dispatch(close);
  }
};
