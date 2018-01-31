import crypto from '../utils/crypto';
import {div, ul, li} from '../utils/elements';
import img from '../utils/make-image';
import {close} from '../modules/modal/actions';
import styles from './Modal.css';

export default class Modal {
  constructor (state = {}, store) {
    this.el = this.render(state);
    this.store = store;
    this.listener = this.listener.bind(this);
  }

  listener (e) {
    const {target} = e;
    const isModal = this.el === target;

    if (isModal) {
      this.store.dispatch(close);
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

    const className = [
      styles.hide,
      styles.modal
    ].join(' ');

    const el = this.el || div({className});

    if (isActive && !isOpen) {
      el.classList.remove(styles.hide);

      const {item} = state.modal;
      const {data} = state.currency;
      const itemData = data[item];
      const [symbol] = item.split('_').slice(-1);

      el.appendChild(
        div({className: styles.content},
          this.modalItem({title: 'coin', data: img(symbol)}),
          this.modalItem({title: 'symbol', data: symbol}),
          this.modalItem({title: 'name', data: crypto[symbol]}),
          this.modalItem({title: 'price', data: itemData.last}),
          this.modalItem({title: 'volume', data: itemData.quoteVolume}),
          this.modalItem({title: 'change', data: itemData.percentChange})
        )
      );
      this.addListener(el);
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
