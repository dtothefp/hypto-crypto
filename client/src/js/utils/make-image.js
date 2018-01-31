import {img} from './elements';

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
