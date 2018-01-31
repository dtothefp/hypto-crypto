import crypto from '../utils/crypto';
import {ul, li} from '../utils/elements';
import img from '../utils/make-image';
import styles from './GridItem.css';

export default class GridItem {
  constructor (state, listener) {
    this.state = state;
    this.el = this.render(state);
    this.listener = listener;
    this.listen(this.el);
  }

  listen (el) {
    el.addEventListener('click', (e) => {
      this.listener(this.state.title);
    });
  }

  update (state) {
    const noChange = this.state.change === state.change && this.state.selected === state.selected;

    if (noChange) return this.el;

    const nextEl = this.render(state);

    this.el.parentElement.replaceChild(nextEl, this.el);
    this.el = nextEl;
    this.state = state;

    this.listen(this.el);

    return this.el;
  }

  render (state) {
    const classes = [styles.ul];
    const changeClasses = [styles.li];
    const [prefix, suffix] = (state.title && state.title.split('_')) || [];

    if (state.selected !== prefix) {
      classes.push(styles.hide);
    }

    if (!isNaN(this.state.change)) {
      const next = Number(state.change);
      const previous = Number(this.state.change);

      if (next > previous) {
        changeClasses.push(styles.gain);
      } else if (next < previous) {
        changeClasses.push(styles.loss);
      }
    }

    return ul(
      {className: classes.join(' ')},
      li({className: styles.li}, img(suffix)),
      li({className: styles.li}, suffix),
      li({className: styles.li}, crypto[suffix]),
      li({className: changeClasses.join(' ')}, state.change)
    );
  }
}
