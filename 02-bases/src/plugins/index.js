const { http } = require("./http-client.plugin");
const { getUUID } = require("./get-id.plugin");
const { getAge } = require("./get-age.plugin");

module.exports = {
  http,
  getUUID,
  getAge,
}
