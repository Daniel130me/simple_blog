import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 5000;

server.use(middlewares);

server.use("/api", router);

server.use(express.static(path.join(__dirname, "dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
