import { getPokemonNameById } from "./js-foundation/06-promises";
import { buildLogger } from "./plugins";

const logger = buildLogger("app.js");

logger.log("Hello from app.js");
logger.error("Error from app.js");


getPokemonNameById(1)
  .then((name) => { console.log(name) });