import express from "express";
import {
  authController,
  userController,
  clientController,
  productController,
  commodityController,
  tankController,
  itemController,
  imageController,
  videoController,
  genreController,
} from "./controller";
import middleware from "./middleware";

class AuthRouter {
  constructor() {
    this.router = express.Router();

    this.router.post("/signup", authController.signup);

    this.router.post("/signin", authController.signin);

    this.router.delete(
      "/signout",
      middleware.authenticateUser,
      authController.signout
    );
  }
}

class UserRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(userController.select);

    this.router
      .route("/:id(\\d|\\w{32})")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(userController.selectById)
      .patch(userController.update)
      .delete(userController.delete);
  }
}

class ImageRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .post(imageController.create)
      .get(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        imageController.select
      );

    this.router
      .route("/:id(\\d|\\w{32})")
      .get(imageController.selectById)
      .patch(imageController.update)
      .delete(imageController.delete);
  }
}

class VideoRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .post(videoController.create)
      .get(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        videoController.select
      );

    this.router
      .route("/:id(\\d|\\w{32})")
      .get(videoController.selectById)
      .patch(videoController.update)
      .delete(videoController.delete);
  }
}

class GenreRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(genreController.create)
      .get(genreController.select);
  }
}

class ClientRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(clientController.create)
      .get(clientController.select);

    this.router.get("/enums", clientController.selectEnums);

    this.router
      .route("/:id(\\d|\\w{32})")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(clientController.selectById)
      .patch(clientController.update)
      .delete(clientController.delete);
  }
}

class ProductRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(productController.create)
      .get(productController.select);

    this.router
      .route("/:id(\\d|\\w{32})")
      .get(productController.selectById)
      .patch(productController.update)
      .delete(productController.delete);
  }
}

class CommodityRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(commodityController.create)
      .get(commodityController.select);

    this.router
      .route("/:id(\\d|\\w{32})")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(commodityController.selectById)
      .patch(commodityController.update)
      .delete(commodityController.delete);
  }
}

class TankRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(tankController.create)
      .get(tankController.select);

    this.router
      .route("/:id(\\d|\\w{32})")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(tankController.selectById)
      .patch(tankController.update)
      .delete(tankController.delete);
  }
}

class ItemRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .post(itemController.create)
      .get(itemController.select);

    this.router.get("/enums", itemController.selectEnums);

    this.router
      .route("/:id(\\d|\\w{32})")
      .all(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin")
      )
      .get(itemController.selectById)
      .patch(itemController.update)
      .delete(itemController.delete);
  }
}

export const { router: itemRouter } = new ItemRouter();
export const { router: tankRouter } = new TankRouter();
export const { router: commodityRouter } = new CommodityRouter();
export const { router: productRouter } = new ProductRouter();
export const { router: clientRouter } = new ClientRouter();
export const { router: genreRouter } = new GenreRouter();
export const { router: videoRouter } = new VideoRouter();
export const { router: imageRouter } = new ImageRouter();
export const { router: userRouter } = new UserRouter();
export const { router: authRouter } = new AuthRouter();
