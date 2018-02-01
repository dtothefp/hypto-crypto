import Nav from '../../src/js/components/Nav';
import createStore from '../../src/js/modules/bootstrap';
import {set, select} from '../../src/js/modules/nav/actions';

describe('#Modal', () => {
  const items = ['BTC_ETH', 'USDT_BTC', 'XMR_LTC', 'ETH_BCH'];
  const data = items.reduce((acc, item) => ({
    ...acc,
    [item]: item
  }), {});
  let item, store;

  beforeEach(() => {
    store = createStore();
    item = new Nav(store.getState(), store);
    store.subscribe((state) => item.update(state));
  });

  test('it should set the nav items', () => {
    expect(item.el.firstChild).toBeFalsy();

    store.dispatch(set(data));

    let children = [...item.el.querySelector('ul').children];

    children.forEach((child, i) => {
      const [symbol] = items[i].split('_');

      expect(child.textContent).toBe(symbol);
    });

    expect(children[0].classList.contains('selected')).toBeTruthy();

    const [nextItem] = items[1].split('_');

    store.dispatch(select(nextItem));

    children = [...item.el.querySelector('ul').children];

    expect(children[0].classList.contains('selected')).toBeFalsy();
    expect(children[1].classList.contains('selected')).toBeTruthy();
  });
});
