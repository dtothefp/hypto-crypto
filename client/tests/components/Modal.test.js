import serialize from 'dom-serialize';
import Modal from '../../src/js/components/Modal';
import createStore from '../../src/js/modules/bootstrap';
import {open, close, move} from '../../src/js/modules/modal/actions';

describe('#Modal', () => {
  const symbols = ['BCH', 'BELA', 'BLK'];
  const symbol = 'BTC_BCH';
  const modal = {
    item: symbol
  };
  const mockCurrency = {
    last: 'last',
    quoteVolume: 'quoteVolume',
    percentChange: 'percentChange'
  };
  const data = symbols.reduce((acc, symbol) => ({
    ...acc,
    [`BTC_${symbol}`]: mockCurrency
  }), {});
  const currency = {
    data,
    groups: {
      BTC: symbols
    }
  };
  const html = (coin) => `<li>SYMBOL</li><li>${coin}</li>`;
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
    expect(serialize(item.el)).toEqual(
      expect.stringContaining(html(symbols[0]))
    );

    store.dispatch(close);

    expect(item.el.children.length).toBeFalsy();
    expect(item.el.classList.contains('hide')).toBeTruthy();
  });

  test('it should move forward in the modal sequence', () => {
    store.dispatch(open(symbol));

    const len = symbols.length;

    for (let i = 0; i < len; i += 1) {
      let nextItemIdx = i + 1;
      store.dispatch(move('forward'));

      if (i === len - 1) {
        nextItemIdx = 0;
      }

      expect(serialize(item.el)).toEqual(
        expect.stringContaining(html(symbols[nextItemIdx]))
      );
    }
  });

  test('it should move backward in the modal sequence', () => {
    const len = symbols.length - 1;

    const lastSymbol = `BTC_${symbols[len]}`;

    store.dispatch(open(lastSymbol));

    for (let i = len; i >= 0; i -= 1) {
      let prevItemIdx = i - 1;
      store.dispatch(move('back'));

      if (i === 0) {
        prevItemIdx = len;
      }

      expect(serialize(item.el)).toEqual(
        expect.stringContaining(html(symbols[prevItemIdx]))
      );
    }
  });
});
