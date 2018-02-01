/**
 * Simplistic logging based upon presence of environment variables
 *
 * @param {...string} args
 * @returns {undefined}
 */
export default function (...args) {
  const {BABEL_ENV, NODE_ENV} = process.env;

  if (BABEL_ENV !== 'test' && BABEL_ENV !== 'server' && NODE_ENV !== 'production') {
    console.log(...args);
  }
}
