import { createServer } from "http";
import url from "url";
import fs from "fs/promises";
import path from "path";

const hostname = "127.0.0.1";
const port = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      switch (req.url) {
        case "/":
          filePath = path.join(__dirname, "public", "index.html");
          break;
        case "/about":
          filePath = path.join(__dirname, "public", "about.html");
          break;
        case "/contact-me":
          filePath = path.join(__dirname, "public", "contact-me.html");
          break;
        default:
          filePath = path.join(__dirname, "public", "404.html");
      }
      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  } catch (error) {
    res.writeHead(201, { "Content-Type": "text/html" });
    res.end(error);
  }
});
server.listen(port, hostname, () => {
  console.log(`Server Running at http://${hostname}:${port}/`);
});
