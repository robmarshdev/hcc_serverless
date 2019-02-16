exports.formatUrlDate = (date) => {
  return date.toLocaleDateString()
    .split('/')
    .join('-');
};
