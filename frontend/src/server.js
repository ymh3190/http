import "dotenv/config";
import "./layer";
import express from "express";
import helmet from "helmet";
import cors from "cors";
// import { rateLimit } from "express-rate-limit";
import { rootRouter } from "./router";
import middleware from "./middleware";

// import socket from "./socket";

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
    const port = process.env.PORT || 3999;
    this.#app.listen(port, () => {
      console.log(`Server is listening port ${port}`);
    });
    /* const http = this.#app.listen() */
    // socket.connect(http);
  }

  #setConfig() {
    this.#app.set("trust proxy", 1);
    this.#app.set("view engine", "ejs");
    this.#app.set("views", process.cwd() + "/views/layouts");
  }

  #useMiddleware() {
    // this.#app.use(
    //   rateLimit({
    //     windowMs: 15 * 1000 * 60,
    //     limit: 100,
    //     standardHeaders: "draft-7",
    //     legacyHeaders: false,
    //   })
    // );
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
  }

  #errorHandler() {
    this.#app.use(middleware.notFound);
    this.#app.use(middleware.errorHandler);
  }
}

const server = new Server();
export default server;
