import {http as httpActions} from '../action-types';
import {set as setNav} from '../nav/actions';
import {init} from '../modal/actions';
import http from '../../services/http';

const {
  PENDING,
  ERROR,
  SUCCESS
} = httpActions;

export const get = async ({getState, dispatch}) => {
  dispatch({type: PENDING});

  let data;

  try {
    const {API: url} = process.env;

    data = await http({url});
  } catch (err) {
    return dispatch({type: ERROR});
  }

  const state = getState();

  dispatch({type: SUCCESS, data});

  if (!state.nav.items) {
    dispatch(setNav(data));
    dispatch(init);
  }

  return data;
};
