import express from "express";
import { rootController } from "./controller";
import middleware from "./middleware";

class RootRouter {
  constructor() {
    this.router = express.Router();

    this.router.get("/", middleware.authenticateUser, rootController.getIndex);

    this.router.get(
      "/signin",
      middleware.unauthenticateUser,
      rootController.getSignin
    );

    this.router.get(
      "/images",
      middleware.authenticateUser,
      rootController.getImage
    );

    this.router.get(
      "/videos",
      middleware.authenticateUser,
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
      rootController.getClient
    );

    this.router.get(
      "/products",
      middleware.authenticateUser,
      rootController.getProduct
    );

    this.router.get(
      "/tanks",
      middleware.authenticateUser,
      rootController.getTank
    );

    this.router.get(
      "/users",
      middleware.authenticateUser,
      rootController.getUsers
    );

    this.router.get(
      "/commodities",
      middleware.authenticateUser,
      rootController.getCommodity
    );

    this.router.get(
      "/commodities/order-plan",
      middleware.authenticateUser,
      rootController.getCommodityOrderPlan
    );

    this.router.get(
      "/commodities/warehousing",
      middleware.authenticateUser,
      rootController.getCommodityWarehousing
    );

    this.router.get(
      "/commodities/forwarding",
      middleware.authenticateUser,
      rootController.getCommodityForwarding
    );

    this.router.get(
      "/commodities/stock",
      middleware.authenticateUser,
      rootController.getCommodityStock
    );

    this.router.get(
      "/operations",
      middleware.authenticateUser,
      rootController.getOperation
    );

    this.router.get(
      "/operations/work-order",
      middleware.authenticateUser,
      rootController.getOperationWorkOrder
    );

    this.router.get(
      "/operations/pre-processing",
      middleware.authenticateUser,
      rootController.getOperationPreprocessing
    );

    this.router.get(
      "/operations/distillation",
      middleware.authenticateUser,
      rootController.getOperationDistillation
    );

    this.router.get(
      "/operations/boiler",
      middleware.authenticateUser,
      rootController.getOperationBoiler
    );

    this.router.get(
      "/operations/end",
      middleware.authenticateUser,
      rootController.getOperationEnd
    );

    this.router.get(
      "/products/register",
      middleware.authenticateUser,
      rootController.getProductRegister
    );

    this.router.get(
      "/products/release",
      middleware.authenticateUser,
      rootController.getProductRelease
    );

    this.router.get(
      "/products/stock",
      middleware.authenticateUser,
      rootController.getProductStock
    );

    this.router.get(
      "/aggregates",
      middleware.authenticateUser,
      rootController.getAggregate
    );

    this.router.get(
      "/aggregates/process",
      middleware.authenticateUser,
      rootController.getAggregateProcess
    );

    this.router.get(
      "/aggregates/operation",
      middleware.authenticateUser,
      rootController.getAggregateOperation
    );

    this.router.get(
      "/aggregates/order",
      middleware.authenticateUser,
      rootController.getAggregateOrder
    );

    this.router.get(
      "/aggregates/boiler",
      middleware.authenticateUser,
      rootController.getAggregateBoiler
    );

    this.router.get(
      "/aggregates/machine",
      middleware.authenticateUser,
      rootController.getAggregateMachine
    );
  }
}

export const { router: rootRouter } = new RootRouter();
