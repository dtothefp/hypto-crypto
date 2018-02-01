import crypto from '../utils/crypto';
import {div, ul, li} from '../utils/elements';
import img from '../utils/make-image';
import {close, move} from '../modules/modal/actions';
import styles from './Modal.css';

export default class Modal {
  constructor (state = {}, store) {
    this.state = state;
    this.el = this.render(state);
    this.store = store;
    this.listener = this.listener.bind(this);
  }

  listener (e) {
    const {target} = e;
    const isModal = this.el === target;
    const isForward = target.classList.contains(styles.forward);
    const isBack = target.classList.contains(styles.back);

    if (isModal) {
      this.store.dispatch(close);
    } else if (isForward) {
      this.store.dispatch(move('forward'));
    } else if (isBack) {
      this.store.dispatch(move('back'));
    }
  }

  addListener (el) {
    el.addEventListener('click', this.listener);
  }

  removeListener (el) {
    el.removeEventListener('click', this.listener);
  }

  update (state) {
    this.el = this.render(state);

    this.state = state;
    return this.el;
  }

  modalItem ({title, data}) {
    return ul(
      li(title.toUpperCase()),
      li(data)
    );
  }

  render (state) {
    const isActive = state.modal && state.modal.active === true;
    const isOpen = this.el && !this.el.classList.contains(styles.hide);
    const isDiff = state.modal.item && state.modal.item !== this.state.modal.item;
    const shouldUpdate = (isActive && !isOpen) || isDiff;

    const className = [
      styles.hide,
      styles.modal
    ].join(' ');

    const el = this.el || div({className});

    if (shouldUpdate) {
      el.classList.remove(styles.hide);

      const {item} = state.modal;
      const {data} = state.currency;
      const itemData = data[item];
      const [symbol] = item.split('_').slice(-1);

      const content = div({className: styles.content},
        div({className: styles.back}),
        this.modalItem({title: 'coin', data: img(symbol)}),
        this.modalItem({title: 'symbol', data: symbol}),
        this.modalItem({title: 'name', data: crypto[symbol]}),
        this.modalItem({title: 'price', data: itemData.last}),
        this.modalItem({title: 'volume', data: itemData.quoteVolume}),
        this.modalItem({title: 'change', data: itemData.percentChange}),
        div({className: styles.forward})
      );
      const child = el.firstChild;

      if (child) {
        el.replaceChild(content, child);
      } else {
        el.appendChild(content);
        this.addListener(el);
      }
    } else if (!isActive && isOpen) {
      this.removeListener(el);
      this.el.classList.add(styles.hide);

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    return el;
  }
}
