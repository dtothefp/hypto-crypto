import createStore from '../services/store';
import currency from './http/reducer';
import nav from './nav/reducer';
import modal from './modal/reducer';

export default function (state = {}) {
  return createStore({
    currency,
    modal,
    nav
  }, state);
}
