import { readFileSync } from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  // html
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.write(`<h1>Url ${req.url}</h1>`);
  // res.end();

  // json
  // const data = { name: "Gridman", age: 24, city: "Bogota DC" };
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.write(JSON.stringify(data));
  // res.end(JSON.stringify(data));

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

  const responseContent = readFileSync(`./public${req.url}`, "utf-8");
  res.end(responseContent);

  // res.writeHead(404, { "Content-Type": "text/html" });
  // res.end("<h1>404 Not Found</h1>");
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
