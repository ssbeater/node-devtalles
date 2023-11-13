const { http } = require("./http-client.plugin");
const { getUUID } = require("./get-id.plugin");
const { getAge } = require("./get-age.plugin");
const buildLogger = require("./logger.plugin")

module.exports = {
  buildLogger,
  getUUID,
  getAge,
}
