import GridItem from '../../src/js/components/GridItem';

describe('#GridItem', () => {
  const title = 'BTC_ETH';
  const change = '0';
  const gain = '1';
  const loss = '-1';
  const state = {
    title,
    change
  };
  const assign = (data) => Object.assign({}, state, data);
  let item, el;

  beforeEach(() => {
    item = new GridItem(state);
    el = document.createElement('div');

    el.appendChild(item.el);
  });

  test('it should create a hidden item and toggle hidden', () => {
    expect(item.el.classList.contains('hide')).toBeTruthy();

    item.update(assign({
      selected: 'BTC'
    }));

    expect(item.el.classList.contains('hide')).toBeFalsy();
  });

  test('it should show in the UI a gain and loss status', () => {
    const hasClass = (name) => [...item.el.children].splice(-1)[0].classList.contains(name);

    expect(hasClass('li')).toBeTruthy();
    expect(hasClass('gain')).toBeFalsy();
    expect(hasClass('loss')).toBeFalsy();

    item.update(assign({
      change: gain
    }));

    expect(hasClass('gain')).toBeTruthy();
    expect(hasClass('loss')).toBeFalsy();

    item.update(assign({
      change: loss
    }));

    expect(hasClass('gain')).toBeFalsy();
    expect(hasClass('loss')).toBeTruthy();
  });
});
