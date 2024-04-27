import { readFileSync } from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: readFileSync("./keys/server.key"),
    cert: readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    if (req.url === "/") {
      const htmlFile = readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (req.url?.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
    }

    if (req.url?.endsWith(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    }

    try {
      const responseContent = readFileSync(`./public${req.url}`, "utf-8");
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
    }
  }
);

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
