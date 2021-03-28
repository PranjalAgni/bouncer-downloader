const { BASE_PATH } = require('./constant');

const getPath = (date) =>
  `${BASE_PATH}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/prapp7-asterisk1.pr1.highradius.com/`;

const parseDate = (date) => {
  const [day, month, year] = date.split('/');
  return new Date(year, month, day);
};

module.exports = { getPath, parseDate };
