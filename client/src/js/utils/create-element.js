/**
 * typeOf
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
 * appendChild
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
 * addStyles
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
 * createElement
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
