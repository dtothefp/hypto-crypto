import {nav as actions} from '../action-types';

export const set = (data) => ({
  type: actions.SET,
  data
});

export const select = (item) => ({
  type: actions.SELECT,
  item
});
