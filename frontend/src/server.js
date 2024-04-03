import "dotenv/config";
import "./layer";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import {
  authRouter,
  clientRouter,
  commodityRouter,
  imageRouter,
  itemRouter,
  productRouter,
  rootRouter,
  tankRouter,
  userRouter,
  videoRouter,
} from "./router";
import middleware from "./middleware";

import socket from "./socket";

class Server {
  #app;

  constructor() {
    this.#app = express();

    this.#setConfig();
    this.#useMiddleware();
    this.#useRouter();
    this.#errorHandler();
  }

  listen() {
    const port = process.env.PORT || 8081;
    const http = this.#app.listen(port, () => {
      console.log(`Server is listening port ${port}`);
    });
    socket.connect(http);
  }

  #setConfig() {
    this.#app.set("view engine", "ejs");
    this.#app.set("views", process.cwd() + "/views/layouts");
  }

  #useMiddleware() {
    this.#app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginOpenerPolicy: false,
        originAgentCluster: false,
      })
    );
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use("/static", express.static("static"));
    this.#app.use("/public", express.static("public"));
    this.#app.use(middleware.locals);
  }

  #useRouter() {
    this.#app.use("/", rootRouter);
    this.#app.use("/api/v1/auth", authRouter);
    this.#app.use("/api/v1/users", userRouter);
    this.#app.use("/api/v1/images", imageRouter);
    this.#app.use("/api/v1/videos", videoRouter);
    this.#app.use("/api/v1/clients", clientRouter);
    this.#app.use("/api/v1/products", productRouter);
    this.#app.use("/api/v1/commodities", commodityRouter);
    this.#app.use("/api/v1/tanks", tankRouter);
    this.#app.use("/api/v1/items", itemRouter);
  }

  #errorHandler() {
    this.#app.use(middleware.notFound);
    this.#app.use(middleware.errorHandler);
  }
}

const server = new Server();
export default server;
