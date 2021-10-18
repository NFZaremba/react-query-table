const jsonServer = require("json-server");
const app = jsonServer.create();
const express = require("express");
const path = require("path");
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

const initApp = () => {
  app.use(middlewares);
  app.use(router);
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
};

initApp();

// { static: "./client/build" }
