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
    let imageRes, genreRes;
    let images, genres;

    try {
      const cookie = { cookie: req.headers.cookie };
      [imageRes, genreRes] = await Promise.all([
        FetchAPI.get("/images", cookie),
        FetchAPI.get("/genres", cookie),
      ]);

      let data = await imageRes.json();
      images = data.images;
      data = await genreRes.json();
      genres = data.genres;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "Images", images, genres };
    const cookies = imageRes.headers.raw()["set-cookie"];
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
    let videoRes, genreRes;
    let videos, genres;

    try {
      const cookie = { cookie: req.headers.cookie };
      [videoRes, genreRes] = await Promise.all([
        FetchAPI.get("/videos", cookie),
        FetchAPI.get("/genres", cookie),
      ]);

      let data = await videoRes.json();
      videos = data.videos;
      data = await genreRes.json();
      genres = data.genres;
    } catch (error) {
      util.detachCookiesToResponse(res);
      return res.status(200).render("error", { message: error.message });
    }

    const data = { pageTitle: "Videos", videos, genres };
    const cookies = videoRes.headers.raw()["set-cookie"];
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
      return res.status(200).render("mes", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("mes", data);
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
      return res.status(200).render("mes", data);
    }

    const access_token = cookies.find((el) => el.startsWith("access_token"));
    const refresh_token = cookies.find((el) => el.startsWith("refresh_token"));
    res.cookie(access_token);
    res.cookie(refresh_token);
    res.status(200).render("mes", data);
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

class ImageController {
  async create(req, res) {
    const response = await FetchAPI.post("/images", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ image: data.image });
  }

  async select(req, res) {
    const { limit, name } = req.query;

    const cookie = { cookie: req.headers.cookie };
    if (limit) {
      const query = `?limit=${limit[0]}&limit=${limit[1]}`;
      const response = await FetchAPI.get("/images" + query, cookie);
      const data = await response.json();
      return res.status(200).json({ images: data.images });
    }

    if (name) {
      const query = `?name=${name}`;
      const response = await FetchAPI.get("/images" + query, cookie);
      const data = await response.json();
      return res.status(200).json({ images: data.images });
    }

    const response = await FetchAPI.get("/images", cookie);
    const data = await response.json();
    res.status(200).json({ images: data.images });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.get(`/images/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ image: data.image });
  }

  async update(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.patch(`/images/${id}`, req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ image: data.image });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await FetchAPI.delete(`/images/${id}`, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(200).json({ message: data.message });
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
    const { limit, name } = req.query;
    const cookie = { cookie: req.headers.cookie };

    if (limit) {
      const query = `?limit=${limit[0]}&limit=${limit[1]}`;
      const response = await FetchAPI.get("/videos" + query, cookie);
      const data = await response.json();
      return res.status(200).json({ videos: data.videos });
    }

    if (name) {
      const query = `?name=${name}`;
      const response = await FetchAPI.get("/videos" + query, cookie);
      const data = await response.json();
      return res.status(200).json({ videos: data.videos });
    }

    const response = await FetchAPI.get("/videos", cookie);
    const data = await response.json();
    res.status(200).json({ videos: data.videos });
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

class GenreController {
  async create(req, res) {
    const response = await FetchAPI.post("/genres", req.body, {
      cookie: req.headers.cookie,
    });
    const data = await response.json();
    res.status(201).json({ genre: data.genre });
  }

  async select(req, res) {
    const { name } = req.query;
    const cookie = { cookie: req.headers.cookie };

    if (name) {
      const response = await FetchAPI.get(`/genres?name=${name}`, cookie);
      const data = await response.json();
      return res.status(200).json({ genres: data.genres });
    }

    const response = await FetchAPI.get("/genres", cookie);
    const data = await response.json();
    res.status(200).json({ genres: data.genres });
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
export const genreController = new GenreController();
export const imageController = new ImageController();
export const videoController = new VideoController();
export const userController = new UserController();
export const authController = new AuthController();
export const rootController = new RootController();
