import {modal} from '../action-types';

export const open = (item) => ({
  type: modal.OPEN,
  item
});

export const close = {
  type: modal.CLOSE
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
