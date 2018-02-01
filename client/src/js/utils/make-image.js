import {img} from './elements';

/**
 * Create an image HTML element and fallback to a default
 * src if the original does not exist in the static assets
 *
 * @param {string} symbol crypto symbol
 * @returns {HTMLElement}
 */
export default function (symbol) {
  const url = `/img/icons/${symbol.toLowerCase()}.svg`;
  const fallbackUrl = '/img/icons/btc.svg';
  const image = img({src: url});
  let errorCount = 0;

  const listener = (e) => {
    if (errorCount) {
      image.removeEventListener(listener);
    } else {
      image.src = fallbackUrl;
      errorCount += 1;
    }
  };

  image.addEventListener('error', listener);

  return image;
}
