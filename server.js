import express from "express";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use("/api", router);

// Serve static files from the Vite build
server.use(express.static(path.join(__dirname, "dist")));

// Handle SPA routing: serve index.html for any unknown routes
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
