import serialize from 'dom-serialize';
import Nav from '../../src/js/components/Nav';
import createStore from '../../src/js/modules/bootstrap';
import {set, select} from '../../src/js/modules/nav/actions';

describe('#Modal', () => {
  const items = ['BTC_ETH', 'USDT_BTC', 'XMR_LTC', 'ETH_BCH'];
  const data = items.reduce((acc, item) => ({
    ...acc,
    [item]: item
  }), {});
  let item, store, el;

  beforeEach(() => {
    store = createStore();
    item = new Nav(store.getState(), store);
    el = document.createElement('div');
    el.appendChild(item.el);
    store.subscribe((state) => item.update(state));
  });

  test('it should set the nav items', () => {
    expect(item.el.querySelector('ul').children.length).toBeFalsy();

    store.dispatch(set(data));

    [...item.el.querySelector('ul').children].forEach((child, i) => {
      const [symbol] = items[i].split('_');

      expect(child.textContent).toBe(symbol);
    });

    // expect(item.el.children.length).toBeTruthy();

    // store.dispatch(close);

    // expect(item.el.children.length).toBeFalsy();
    // expect(item.el.classList.contains('hide')).toBeTruthy();
  });
});
