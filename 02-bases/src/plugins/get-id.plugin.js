const { v4 } = require("uuid")

const getUUID = () => {
  return v4();
};

module.exports = {
  getUUID,
};