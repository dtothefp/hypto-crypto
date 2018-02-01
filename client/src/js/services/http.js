/**
 * Small wrapper around the `fetch` API
 *
 * @param {object} obj
 * @param {string} method
 * @param {string} url
 * @param {...*} options additional options for `fetch`
 * @returns {Promise}
 */
export default function ({
  method = 'GET',
  url = 'https://poloniex.com/public?command=returnTicker',
  ...options
} = {}) {
  return fetch(url, {
    method,
    ...options
  })
    .then(data => data.json());
}
