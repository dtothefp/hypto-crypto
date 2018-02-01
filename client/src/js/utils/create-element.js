/**
 * @fileOverview Simplistic Vanilla JS attempt at React like components
 * Heavily influenced by {@link https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff}
 *
 */

/**
 * Simplistic type checking differentiating JS objects
 *
 * @param {*} target
 * @returns {string}
 */
function typeOf (target) {
  let type;

  if (Array.isArray(target)) {
    type = 'array';
  } else if (target instanceof window.Element) {
    type = 'element';
  } else {
    type = typeof target;
  }

  return type;
}

/**
 * Append children based upon type
 *
 * @param {HTMLElement} el
 * @param {Array<Array|HTMLElement|String>} children
 * @returns {undefined}
 */
function appendChild (el, children) {
  children.forEach(child => {
    const type = typeOf(child);

    switch (type) {
      case 'array':
        appendChild(el, child);
        break;
      case 'element':
        el.appendChild(child);
        break;
      case 'string':
        el.appendChild(
          document.createTextNode(child)
        );
        break;
    }
  });
}

/**
 * Add inline styles to DOM elements
 *
 * @param {HTMLElement} el
 * @param {Object|undefined} styles
 * @returns {undefined}
 */
function addStyles (el, styles) {
  if (styles) {
    Object.keys(styles).forEach(name => {
      el.style[name] = styles[name];
    });
  } else {
    el.removeAttribute('style');
  }
}

/**
 * Create a DOM element, allowing for various HTML attributes
 * and nesting elements
 *
 * @param {string} tag the html tag name
 * @param {string|array|object|HTMLELement} props
 * @param {...*} rest additional arguments
 * @returns {HTMLElement}
 */
export function createElement (tag, props, ...rest) {
  const el = document.createElement(tag);

  if (!props) return el;

  const type = typeOf(props);

  switch (type) {
    case 'object':
      Object.keys(props).forEach(prop => {
        if (!(prop in el) && prop !== 'styles') return;

        const value = props[prop];

        if (prop === 'styles') {
          addStyles(el, value);
        } else {
          el[prop] = value;
        }
      });
      break;
    default:
      appendChild(el, [].concat(props));
      break;
  }

  if (rest.length) {
    appendChild(el, rest);
  }

  return el;
}
