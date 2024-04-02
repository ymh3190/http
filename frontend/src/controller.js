import FetchAPI from "./fetch-api";
import * as CustomError from "./error";
import orderer from "./alarm";
import util from "./util";

class RootController {
  getIndex(req, res) {
    try {
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "SW" };
    res.status(200).render("base", data);
  }

  getSignin(req, res) {
    res.status(200).render("auth", { pageTitle: "로그인" });
  }

  getSignup(req, res) {
    res.status(200).render("auth", { pageTitle: "회원 가입" });
  }

  getImage(req, res) {
    let imageRes;
    let images;
    try {
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }
    res.status(200).render("base", { pageTitle: "Images" });
  }

  async getVideo(req, res) {
    let response;
    let videos;
    try {
      response = await FetchAPI.get("/videos", {
        cookie: req.headers.cookie,
      });
      const data = await response.json();
      videos = data.videos;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }
    const data = { pageTitle: "Videos", videos };
    const cookies = response.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("base", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("base", data);
  }

  async getClient(req, res) {
    let clientRes;
    let clients;

    try {
      const cookie = { cookie: req.headers.cookie };
      clientRes = await FetchAPI.get("/clients", cookie);
      let data = await clientRes.json();
      clients = data.clients;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const types = global.clientTypes;
    const data = { pageTitle: "거래처 정보", clients, types };
    const cookies = clientRes.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("base", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("base", data);
  }

  async getCommodity(req, res) {
    let commodityRes, itemRes;
    let commodities, items;

    try {
      const cookie = { cookie: req.headers.cookie };
      [commodityRes, itemRes] = await Promise.all([
        FetchAPI.get("/commodities", cookie),
        FetchAPI.get("/items", cookie),
      ]);
      let data = await commodityRes.json();
      commodities = data.commodities;

      data = await itemRes.json();
      items = data.items;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const types = global.itemTypes;
    const data = { pageTitle: "원자재 정보", commodities, types, items };
    const cookies = commodityRes.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("base", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("base", data);
  }

  async getProduct(req, res) {
    let productRes;
    let products;

    try {
      const cookie = { cookie: req.headers.cookie };
      [productRes] = await Promise.all([FetchAPI.get("/products", cookie)]);
      let data = await productRes.json();
      products = data.products;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "제품 정보", products };
    const cookies = productRes.headers.raw()["set-cookie"];
    if (!cookies) {
      return res.status(200).render("base", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("base", data);
  }

  getTank(req, res) {
    res.status(200).render("base", { pageTitle: "탱크 정보" });
  }

  getUsers(req, res) {
    res.status(200).render("base", { pageTitle: "사용자 정보" });
  }

  getCommodityOrderPlan(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getCommodityWarehousing(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getCommodityForwarding(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getCommodityStock(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperation(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperationWorkOrder(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperationPreprocessing(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperationDistillation(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperationBoiler(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getOperationEnd(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getProductRegister(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getProductRelease(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getProductStock(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregate(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregateProcess(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregateOperation(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregateOrder(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregateBoiler(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }

  getAggregateMachine(req, res) {
    res.status(200).render("base", { pageTitle: "SW" });
  }
}

class AuthController {
  async signup(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError.BadRequestError("Provide username and password");
    }

    await FetchAPI.post("/auth/signup", { username, password });
    res.status(201).end();
  }

  async signin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError.BadRequestError("Provide username and password");
    }

    const ip = req.ip;
    const userAgent = req.headers["user-agent"];

    const response = await FetchAPI.post(
      "/auth/signin",
      { username, password },
      { ip, userAgent }
    );

    const data = await response.json();
    const cookies = response.headers.raw()["set-cookie"];
    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));

    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).json({ user: data.user });
  }

  async signout(req, res) {
    const response = await FetchAPI.delete("/auth/signout", {
      cookie: req.headers.cookie,
    });

    const cookies = response.headers.raw()["set-cookie"];
    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));

    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).end();
  }
}

class UserController {
  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/users/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ user: data.user });
  }
}
class VideoController {
  async create(req, res) {
    const response = await FetchAPI.post("/videos", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ video: data.video });
  }

  async select(req, res) {
    const { limit } = req.query;

    if (limit) {
      const query = `?limit=${limit[0]}&limit=${limit[1]}`;
      const response = await FetchAPI.get("/videos" + query, {
        cookie: req.headers.cookie,
      });
      const data = await response.json();
      res.status(200).json({ videos: data.videos });
    }
  }

  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/videos/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ video: data.video });
  }

  async update(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.patch(`/videos/${id}`, req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ video: data.video });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.delete(`/videos/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ message: data.message });
  }
}

class ClientController {
  async create(req, res) {
    const response = await FetchAPI.post("/clients", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ client: data.client });
  }

  async select(req, res) {
    const { type, company } = req.query;

    let query = "";
    if (type && company) {
      query += `?type=${type}&company=${company}`;
    } else if (type) {
      query += `?type=${type}`;
    } else if (company) {
      query += `?company=${company}`;
    }

    const response = await FetchAPI.get("/clients" + query, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ clients: data.clients });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/clients/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ client: data.client });
  }

  async update(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.patch(`/clients/${id}`, req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ client: data.client });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.delete(`/clients/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ message: data.message });
  }
}

class ProductController {
  async create(req, res) {}

  async select(req, res) {}

  async selectById(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

class CommodityController {
  async create(req, res) {
    const response = await FetchAPI.post("/commodities", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ commodity: data.commodity });
  }

  async select(req, res) {
    const { item_id, name } = req.query;

    let query = "";
    if (item_id && name) {
      query += `?item_id=${item_id}&name=${name}`;
    } else if (item_id) {
      query += `?item_id=${item_id}`;
    } else if (name) {
      query += `?name=${name}`;
    }

    const response = await FetchAPI.get("/commodities" + query, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ commodities: data.commodities });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/commodities/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ commodity: data.commodity });
  }

  async update(req, res) {}

  async delete(req, res) {}
}

class TankController {
  async create(req, res) {}

  async select(req, res) {}

  async selectById(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

class ItemController {
  async create(req, res) {
    const response = await FetchAPI.post("/items", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ item: data.item });
  }

  async select(req, res) {
    const { type } = req.query;

    let query = "";
    if (type) {
      query += `?type=${type}`;
    }

    const response = await FetchAPI.get("/items" + query, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ items: data.items });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/items/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ item: data.item });
  }

  async update(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.patch(`/items/${id}`, req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ item: data.item });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.delete(`/items/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ message: data.message });
  }

  async selectEnums(req, res) {
    const response = await FetchAPI.get("/items/enums");
    const data = await response.json();
    res.status(200).json({ enums: data.enums });
  }
}

export const itemController = new ItemController();
export const tankController = new TankController();
export const commodityController = new CommodityController();
export const productController = new ProductController();
export const clientController = new ClientController();
export const videoController = new VideoController();
export const userController = new UserController();
export const authController = new AuthController();
export const rootController = new RootController();
