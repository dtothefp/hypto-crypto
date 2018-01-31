const classes = [
  'ul',
  'li',
  'modal',
  'hide',
  'gain',
  'loss',
  'content',
  'nav'
];

module.exports = classes.reduce((acc, name) => ({
  ...acc,
  [name]: name
}), {});
