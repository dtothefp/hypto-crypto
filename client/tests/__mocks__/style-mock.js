const classes = [
  'ul',
  'li',
  'modal',
  'hide',
  'gain',
  'loss',
  'content',
  'nav',
  'selected'
];

module.exports = classes.reduce((acc, name) => ({
  ...acc,
  [name]: name
}), {});
