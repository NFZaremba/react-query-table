const jsonServer = require("json-server");
const app = jsonServer.create();
const express = require("express");
const path = require("path");
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ static: "./client/build" });
const port = process.env.PORT || 3001;

const initApp = () => {
  app.use(middlewares);

  app.use(express.static(path.resolve(__dirname, "./client/build")));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

  app.use(router);
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
};

initApp();

// { static: "../client/build" }
