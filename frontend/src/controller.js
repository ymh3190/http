import FetchAPI from "./fetch-api";
import * as CustomError from "./error";
import orderer from "./alarm";
import util from "./util";

class RootController {
  getIndex(req, res) {
    const data = { pageTitle: "HTTP" };
    res.status(200).render("base", data);
  }

  getSignin(req, res) {
    res.status(200).render("auth", { pageTitle: "로그인" });
  }

  getSignup(req, res) {
    res.status(200).render("auth", { pageTitle: "회원 가입" });
  }

  async getImage(req, res) {
    let response, response_;
    let images, genres;

    try {
      const cookie = { cookie: req.headers.cookie };
      [response, response_] = await Promise.all([
        FetchAPI.get("/images", cookie),
        FetchAPI.get("/genres", cookie),
      ]);

      const [data, data_] = await Promise.all([
        response.json(),
        response_.json(),
      ]);
      images = data.images;
      genres = data_.genres;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "Images", images, genres };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("tube", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("tube", data);
  }

  async getVideo(req, res) {
    let response, response_;
    let videos, genres;

    try {
      const cookie = { cookie: req.headers.cookie };
      [response, response_] = await Promise.all([
        FetchAPI.get("/videos", cookie),
        FetchAPI.get("/genres", cookie),
      ]);

      const [data, data_] = await Promise.all([
        response.json(),
        response_.json(),
      ]);
      videos = data.videos;
      genres = data_.genres;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "Videos", videos, genres };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("tube", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("tube", data);
  }

  async getClient(req, res) {
    let response;
    let clients;

    try {
      const cookie = { cookie: req.headers.cookie };
      response = await FetchAPI.get("/clients", cookie);
      const data = await response.json();
      clients = data.clients;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const types = global.clientTypes;
    const data = { pageTitle: "거래처 정보", clients, types };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("mes", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("mes", data);
  }

  async getCommodity(req, res) {
    let response, response_;
    let commodities, items;

    try {
      const cookie = { cookie: req.headers.cookie };
      [response, response_] = await Promise.all([
        FetchAPI.get("/commodities", cookie),
        FetchAPI.get("/items", cookie),
      ]);
      const [data, data_] = await Promise.all([
        response.json(),
        response_.json(),
      ]);
      commodities = data.commodities;
      items = data_.items;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const types = global.itemTypes;
    const data = { pageTitle: "원자재 정보", commodities, types, items };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("mes", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("mes", data);
  }

  async getProduct(req, res) {
    let response;
    let products;

    try {
      const cookie = { cookie: req.headers.cookie };
      [response] = await Promise.all([FetchAPI.get("/products", cookie)]);
      const data = await response.json();
      products = data.products;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "제품 정보", products };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("mes", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("mes", data);
  }

  getTank(req, res) {
    res.status(200).render("mes", { pageTitle: "탱크 정보" });
  }

  getUsers(req, res) {
    res.status(200).render("mes", { pageTitle: "사용자 정보" });
  }

  getCommodityOrderPlan(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getCommodityWarehousing(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getCommodityForwarding(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getCommodityStock(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperation(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperationWorkOrder(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperationPreprocessing(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperationDistillation(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperationBoiler(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getOperationEnd(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getProductRegister(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getProductRelease(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getProductStock(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregate(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregateProcess(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregateOperation(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregateOrder(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregateBoiler(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }

  getAggregateMachine(req, res) {
    res.status(200).render("mes", { pageTitle: "HTTP" });
  }
}

export const rootController = new RootController();
