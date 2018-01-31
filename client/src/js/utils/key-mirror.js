export default function (prefix, actions) {
  return actions.reduce((acc, action) => ({
    ...acc,
    [action]: `${prefix.toUpperCase()}_${action}`
  }), {});
}
