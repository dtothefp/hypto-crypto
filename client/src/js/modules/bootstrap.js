import createStore from '../services/store';
import currency from './http/reducer';
import nav from './nav/reducer';
import modal from './modal/reducer';

/**
 * Small wrapper around Redux'ish `createStore` to add the
 * reducers and potential initial state
 *
 * @param {object} state initial state for flux store
 * @returns {objct} store
 */
export default function (state = {}) {
  return createStore({
    currency,
    modal,
    nav
  }, state);
}
