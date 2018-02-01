import App from './containers/App';
import createStore from './modules/bootstrap';
import {get} from './modules/http/actions';
import '../css/main.css';

const store = createStore(
  JSON.parse(global.STORE_STATE || '{}')
);
const app = new App(store);
const {INTERVAL} = process.env;

setInterval(() => {
  store.dispatch(get);
}, INTERVAL);

app.children.forEach(component => {
  store.subscribe(state => component.update(state));
});

document.body.replaceChild(
  app.el,
  document.getElementById('app')
);
