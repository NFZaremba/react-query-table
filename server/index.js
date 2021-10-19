const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults(); // { static: "./client/build" }
const port = process.env.PORT || 3001;

const initApp = () => {
  app.use(middlewares);
  app.use(router);
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
};

initApp();
