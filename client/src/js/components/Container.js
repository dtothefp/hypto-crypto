import GridItem from './GridItem';
import {div} from '../utils/elements';
import {open} from '../modules/modal/actions';
import styles from './Container.css';

export default class Container {
  constructor (state = {}, store) {
    this.listener = this.listener.bind(this);
    this.store = store;
    this.children = this.makeChildren(state);
    this.el = this.render(state);
    this.selected = state.nav && state.nav.selected;
  }

  listener (content) {
    this.store.dispatch(open(content));
  }

  makeChildren (state) {
    const {currency = {}, nav = {}} = state;
    const {data} = currency;

    if (!data) return [];

    const {selected} = nav;
    const children = this.children || [];

    Object.keys(data).forEach((title, i) => {
      const child = children[i];
      const childState = {
        title,
        change: data[title].percentChange,
        selected
      };

      if (child) {
        child.update(childState);
      } else {
        const item = new GridItem(childState, this.listener);

        children.push(item);
      }
    });

    return children;
  }

  update (state) {
    this.makeChildren(state);

    return this.render(state);
  }

  render (state) {
    const el = this.el || div({className: styles.container});

    if (!el.children.length && this.children.length) {
      this.children.forEach(child => {
        el.appendChild(child.el);
      });
    }

    return el;
  }
}
