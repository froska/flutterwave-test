import express from "express";
import { catchInvalidJson } from "./src/error-handler/index.js";
import routes from "./src/routes/index.js";

const server = express();

server.use(express.json());

server.use("/", routes);
server.use(catchInvalidJson);
server.use("*", function (req, res, next) {
  res.send({
    message: "Cannot find path.",
    status: "error",
    data: null,
  });
});

export { server as default };
