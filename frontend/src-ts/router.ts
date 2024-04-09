import express from "express";
import {
  authController,
  clientController,
  commodityController,
  genreController,
  imageController,
  itemController,
  productController,
  rootController,
  tankController,
  userController,
  videoController,
} from "./controller";
import middleware from "./middleware";

class RootRouter {
  constructor() {
    this.router = express.Router();

    this.router.get(
      "/",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getIndex
    );

    this.router.get(
      "/signin",
      middleware.unauthenticateUser,
      rootController.getSignin
    );

    this.router.get(
      "/images",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getImage
    );

    this.router.get(
      "/videos",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getVideo
    );

    this.router.get(
      "/signup",
      middleware.unauthenticateUser,
      rootController.getSignup
    );

    this.router.get(
      "/clients",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getClient
    );

    this.router.get(
      "/products",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getProduct
    );

    this.router.get(
      "/tanks",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getTank
    );

    this.router.get(
      "/users",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getUsers
    );

    this.router.get(
      "/commodities",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getCommodity
    );

    this.router.get(
      "/commodities/order-plan",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getCommodityOrderPlan
    );

    this.router.get(
      "/commodities/warehousing",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getCommodityWarehousing
    );

    this.router.get(
      "/commodities/forwarding",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getCommodityForwarding
    );

    this.router.get(
      "/commodities/stock",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getCommodityStock
    );

    this.router.get(
      "/operations",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperation
    );

    this.router.get(
      "/operations/work-order",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperationWorkOrder
    );

    this.router.get(
      "/operations/pre-processing",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperationPreprocessing
    );

    this.router.get(
      "/operations/distillation",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperationDistillation
    );

    this.router.get(
      "/operations/boiler",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperationBoiler
    );

    this.router.get(
      "/operations/end",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getOperationEnd
    );

    this.router.get(
      "/products/register",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getProductRegister
    );

    this.router.get(
      "/products/release",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getProductRelease
    );

    this.router.get(
      "/products/stock",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getProductStock
    );

    this.router.get(
      "/aggregates",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregate
    );

    this.router.get(
      "/aggregates/process",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregateProcess
    );

    this.router.get(
      "/aggregates/operation",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregateOperation
    );

    this.router.get(
      "/aggregates/order",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregateOrder
    );

    this.router.get(
      "/aggregates/boiler",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregateBoiler
    );

    this.router.get(
      "/aggregates/machine",
      middleware.authenticateUser,
      middleware.authorizePermissions("admin"),
      rootController.getAggregateMachine
    );
  }
}

class AuthRouter {
  constructor() {
    this.router = express.Router();

    this.router.post(
      "/signup",
      middleware.unauthenticateUser,
      authController.signup
    );

    this.router.post(
      "/signin",
      middleware.unauthenticateUser,
      authController.signin
    );

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
      .route("/:id(\\d|\\w{32})")
      .get(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        userController.selectById
      );
  }
}

class ImageRouter {
  constructor() {
    this.router = express.Router();

    this.router
      .route("/")
      .post(imageController.create)
      .get(imageController.select);

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
      .get(videoController.select);

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

    this.router
      .route("/:id(\\d|\\w{32})")
      .get(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        clientController.selectById
      )
      .patch(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        clientController.update
      )
      .delete(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        clientController.delete
      );
  }
}

class ProductRouter {
  constructor() {
    this.router = express.Router();
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
      .get(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        itemController.selectById
      )
      .patch(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        itemController.update
      )
      .delete(
        middleware.authenticateUser,
        middleware.authorizePermissions("admin"),
        itemController.delete
      );
  }
}

export const { router: itemRouter } = new ItemRouter();
export const { router: tankRouter } = new TankRouter();
export const { router: commodityRouter } = new CommodityRouter();
export const { router: productRouter } = new ProductRouter();
export const { router: clientRouter } = new ClientRouter();
export const { router: genreRouter } = new GenreRouter();
export const { router: imageRouter } = new ImageRouter();
export const { router: videoRouter } = new VideoRouter();
export const { router: userRouter } = new UserRouter();
export const { router: authRouter } = new AuthRouter();
export const { router: rootRouter } = new RootRouter();
