import {div} from '../utils/elements';
import Container from '../components/Container';
import Nav from '../components/Nav';
import Modal from '../components/Modal';

export default class App {
  constructor (store) {
    const state = store.getState();

    this.children = [
      new Nav(state, store),
      new Container(state, store),
      new Modal(state, store)
    ];
    this.store = store;
    this.el = this.render(state);
  }

  render (state) {
    return div({id: 'app'}, this.children.map(child => child.el));
  }
}
