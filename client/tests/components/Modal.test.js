import serialize from 'dom-serialize';
import Modal from '../../src/js/components/Modal';
import createStore from '../../src/js/modules/bootstrap';
import {open, close} from '../../src/js/modules/modal/actions';

describe('#Modal', () => {
  const symbol = 'BTC_ETH';
  const modal = {
    item: symbol
  };
  const currency = {
    data: {
      [symbol]: {
        last: 'last',
        quoteVolume: 'quoteVolume',
        percentChange: 'percentChange'
      }
    }
  };

  const assign = (data) => Object.assign({}, state, data);
  let item, store;

  beforeEach(() => {
    store = createStore({
      modal,
      currency
    });
    item = new Modal(store.getState(), store);
    store.subscribe((state) => item.update(state));
  });

  test('it should hide and show the modal with an action', () => {
    expect(item.el.children.length).toBeFalsy();
    expect(item.el.classList.contains('hide')).toBeTruthy();

    store.dispatch(open(symbol));

    expect(item.el.classList.contains('hide')).toBeFalsy();
    expect(item.el.children.length).toBeTruthy();
    expect.stringContaining('<li>SYMBOL</li><li>ETH</li>');

    store.dispatch(close);

    expect(item.el.children.length).toBeFalsy();
    expect(item.el.classList.contains('hide')).toBeTruthy();
  });
});
