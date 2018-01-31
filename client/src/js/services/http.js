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
