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
  url,
  ...options
} = {}) {
  return fetch(url, {
    method,
    ...options
  })
    .then(data => data.json());
}
