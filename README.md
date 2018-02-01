# Hypto Crypto

## Description
Vanilla JS front-end application using the [Poloniex API](https://poloniex.com/support/api/) to display changes in crypto currency.

## Install and Run
It is useful but not necessary to install [Docker](https://docs.docker.com/install/) and [dockerc-compose](https://docs.docker.com/compose/install/).

- Docker Instructions
```sh
# only do this once
docker network create dev1

# DEV build - serve and develop with webpack-dev-server
docker-compose up client

# PROD build - build static assets with webpack and serve with NGINX
docker-compose -f docker-compose.yml build --no-cache client
docker-compose -f docker-compose.yml up client # navigate to http://localhost
```

- Node / NPM Instructions
```sh
cd client
yarn install

# DEV build - serve and develop with webpack-dev-server
yarn start

# PROD build - build static assets with webpack and serve with BrowserSync
yarn build
yarn serve
```

- Static File Server Instructions
```sh
cd client/dist
python -m SimpleHTTPServer 8080
```

In all examples except Docker prod above navigate to http://localhost:8080

### The Good
- Created isomorphic build for JS components, i.e. render JS to static HTML in the webpack build process.
- Return a Promise as Webpack configuration to allow for initial API request.
- Serialize all initial app data in a script tag in the HTML.
- Use a Babel plugin to create CSS module class names in Node, usually I would have done a second Webpack build in Node to render the isomorphic HTML.
- Stored and managed state in a flux architecture. Made testing and adding new features easy such as the lightbox navigation.
- Crypto is fun...lets ICO and live on an island!

### The Bad
- Was going to use websockets for the Poloniex API on a Koa server but I got lazy and just make requests on an interval from the front-end directly to the API.
- Super lazy with CSS naming because I'm using CSS modules. I'm into BEM and SMACSS but this challenge was more around infrastructure.
- Not great CSS, bad colors, and no media queries. Did get the chance to play superficially with CSS Grid for the first time which was fun.
- Only tested components because they encompass logic from other services, utilities, and flux modules. Therefore, these are more of integration tests rather than unit.
- Could have used the History API and/or location hash to maintain state of the SPA, i.e. on page refresh re-open a previously opened model, or return to the nav tab that was selected.
- I didn't optimize for old browsers, i.e. no polyfills for fetch and es6 features.
- The Modal component doesn't live update when it's open, the component needs to update with the flux store.
- Comment the component code.

### The Ugly
- Even thought the HTML is rendered from the JS I make no attempt to diff it and attach listeners / DOM elements effectively. Essentially, I blow away the entire #app component with an identical new one.
- Component render lifecycle methods such as `render` and `update` don't have a lot of rhyme or reason and don't update DOM efficiently. Adding listeners is a bit tedious as well.
- The app is ugly...wow I'm really not a designer.

### TODO's if I could use frameworks and had more time
- History API / routing
- Create backend and communicate with websockets.
- Code splitting of CSS and JS
- Polyfills and potentially creating specific JS bundles for old browsers and serving them in HTML appropriately.
- DOM diffing / intelligent replacement of isomorphically rendered HTML once JS loads.
- Use SVG sprite for crypto coin icons or inline them.
- Add E2E tests with Selenium / Headless Chrome / BrowserStack.
- Automate generation of docs with JSDoc or use something declarative like TypeScript.
- Probably lots of other things I'm not thinking of right now.
