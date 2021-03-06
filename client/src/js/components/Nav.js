import {nav, ul, li} from '../utils/elements';
import styles from './Nav.css';
import {select} from '../modules/nav/actions';

export default class Nav {
  constructor (state = {}, store) {
    this.el = this.render(state);
    this.state = state;
    this.store = store;
    this.listen(this.el);
  }

  listen (elm) {
    elm.addEventListener('click', (e) => {
      const {target} = e;

      if (target.tagName === 'LI') {
        const isSelected = target.classList.contains(styles.selected);

        if (!isSelected) {
          this.store.dispatch(select(target.textContent));
        }
      }
    });
  }

  update (state) {
    const {nav} = state;
    const {selected} = nav;
    const {select: previousSelected} = this.state.nav || {};

    if (selected && previousSelected !== selected) {
      this.el = this.render(state);
    }

    this.state = state;

    return this.el;
  }

  render (state) {
    const {nav: navState} = state;

    if (!navState) return nav({className: styles.nav});

    const {items, selected} = navState;
    let el;

    const listItems = items.map(item => {
      const style = [styles.li];

      if (item === selected) style.push(styles.selected);

      return li({className: style.join(' ')}, item);
    });

    if (this.el) {
      const child = this.el.firstChild;

      if (child) {
        const previousListItems = child.children;

        listItems.forEach((nextListItem, i) => {
          child.replaceChild(nextListItem, previousListItems[i]);
        });
      } else {
        this.el.appendChild(
          ul({className: styles.ul}, listItems)
        );
      }
    } else {
      el = nav({className: styles.nav},
        ul(
          {className: styles.ul},
          listItems
        )
      );
    }

    return el || this.el;
  }
}
