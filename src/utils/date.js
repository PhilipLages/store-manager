const getDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const fullDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  return fullDate;
};

module.exports = getDate;