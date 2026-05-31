// Minimal dependency-free static file server for Railway.
// Serves the site on the port Railway provides (process.env.PORT).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/" || pathname.endsWith("/")) pathname += "index.html";

    // Resolve safely within ROOT to prevent path traversal.
    const filePath = join(ROOT, normalize(pathname));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    const data = await readFile(filePath);
    const type = TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
    const cache = pathname.endsWith("index.html") ? "no-cache" : "public, max-age=3600";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": cache });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 — Not found</h1>");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`learndesign.tech serving on :${PORT}`);
});
