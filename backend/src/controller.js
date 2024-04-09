import bcrypt from "bcrypt";
import {
  User,
  Token,
  Client,
  Product,
  Commodity,
  Tank,
  Item,
  Video,
  Image,
  Genre,
} from "./db";
import * as CustomError from "./error";
import util from "./util";

class AuthController {
  async signup(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError.BadRequestError("Provide username and password");
    }

    const existingUser = await User.selectOne({ username });
    if (existingUser) {
      throw new CustomError.BadRequestError("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);
    const role = (await User.select({})).length === 0 ? "admin" : "user";

    await User.create({ username, password: hash, role });
    res.status(201).json({ message: "Signup success" });
  }

  async signin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError.BadRequestError("Provide username and password");
    }

    const user = await User.selectOne({ username });
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new CustomError.BadRequestError("Password not match");
    }

    const tokenUser = util.createTokenUser(user);
    let refreshToken = "";
    const existingToken = await Token.selectOne({ user_id: user.id });
    if (existingToken) {
      const { is_valid } = existingToken;
      if (!is_valid) {
        throw new CustomError.UnauthenticatedError("Authentication invalid");
      }

      refreshToken = existingToken.refresh_token;
      util.attachCookiesToResponse({
        res,
        user: tokenUser,
        refresh_token: refreshToken,
      });
      return res.status(200).json({ user: tokenUser });
    }

    const refresh_token = util.createToken();
    // postman
    // const ip = req.ip;
    const ip = req.headers["x-forwared-for"];
    const user_agent = req.headers["user-agent"];
    const user_id = user.id;

    await Token.create({ refresh_token, ip, user_agent, user_id });

    util.attachCookiesToResponse({ res, user: tokenUser, refresh_token });
    res.status(200).json({ user: tokenUser });
  }

  async signout(req, res) {
    await Token.selectOneAndDelete({ user_id: req.user.user_id });

    res.cookie("access_token", "signout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.cookie("refresh_token", "signout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({ message: "Signout success" });
  }
}

class UserController {
  async select(req, res) {
    const users = await User.select({}, "-password");
    res.status(200).json({ users });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const user = await User.selectById(id, "-password");
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }
    res.status(200).json({ user });
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ user });
  }

  async delete(req, res) {
    const { id } = req.params;

    await User.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class ImageController {
  async create(req, res) {
    await Image.createByManualId(req.body);
    res.status(201).end();
  }

  async select(req, res) {
    const { limit, name } = req.query;

    if (limit) {
      delete req.query.limit;
      const images = await Image.select(req.query, {
        created_at: "desc",
        id: "asc",
        limit,
      });
      return res.status(200).json({ images });
    }

    if (name) {
      const images = await Image.selectJoin("genre", { name });
      return res.status(200).json({ images });
    }

    const images = await Image.select({}, { created_at: "desc", id: "asc" });
    res.status(200).json({ images });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const image = await Image.selectById(id);
    if (!image) {
      throw new CustomError.NotFoundError("Image not found");
    }
    res.status(200).json({ image });
  }

  async update(req, res) {
    const { id } = req.params;

    const image = await Image.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ image });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Image.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class VideoController {
  async create(req, res) {
    await Video.createByManualId(req.body);
    res.status(201).end();
  }

  async select(req, res) {
    const { limit, name } = req.query;
    if (limit) {
      const videos = await Video.select(
        {},
        {
          created_at: "desc",
          id: "asc",
          limit,
        }
      );
      return res.status(200).json({ videos });
    }

    if (name) {
      const videos = await Video.selectJoin("genre", { name });
      return res.status(200).json({ videos });
    }

    const videos = await Video.select({}, { created_at: "desc", id: "asc" });
    res.status(200).json({ videos });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const video = await Video.selectById(id);
    if (!video) {
      throw new CustomError.NotFoundError("Video not found");
    }
    res.status(200).json({ video });
  }

  async update(req, res) {
    const { id } = req.params;

    const video = await Video.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ video });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Video.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class GenreController {
  async create(req, res) {
    const genre = await Genre.create(req.body, { new: true });
    res.status(201).json({ genre });
  }

  async select(req, res) {
    const { name } = req.query;
    if (name) {
      const genres = await Genre.select(req.query);
      return res.status(200).json({ genres });
    }

    const genres = await Genre.select({});
    res.status(200).json({ genres });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const genre = await Genre.selectById(id);
    if (!genre) {
      throw new CustomError.NotFoundError("Genre not found");
    }
    res.status(200).json({ genre });
  }

  async update(req, res) {
    const { id } = req.params;

    const genre = await Genre.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ genre });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Genre.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class ClientController {
  async create(req, res) {
    const { company } = req.body;
    if (!company) {
      throw new CustomError.BadRequestError("Provide company");
    }
    req.body.creator_id = req.user.user_id;
    console.log(req.body);
    const client = await Client.create(req.body, { new: true });
    res.status(201).json({ client });
  }

  async select(req, res) {
    const { limit } = req.query;

    if (limit) {
      delete req.query.limit;
      const clients = await Client.select(req.query, {
        company: "desc",
        limit,
      });
      return res.status(200).json({ clients });
    }

    const clients = await Client.select({}, { company: "desc" });
    res.status(200).json({ clients });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const client = await Client.selectById(id);
    if (!client) {
      throw new CustomError.NotFoundError("Client not found");
    }
    res.status(200).json({ client });
  }

  async update(req, res) {
    const { id } = req.params;

    const client = await Client.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ client });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Client.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }

  selectEnums(req, res) {
    res.status(200).json({ enums: Client.enums });
  }
}

class ProductController {
  async create(req, res) {
    const product = await Product.create(req.body, { new: true });
    res.status(201).json({ product });
  }

  async select(req, res) {
    const products = await Product.select({}, { created_at: "desc" });
    res.status(200).json({ products });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const product = await Product.selectById(id);
    if (!product) {
      throw new CustomError.NotFoundError("Product not found");
    }
    res.status(200).json({ product });
  }

  async update(req, res) {
    const { id } = req.params;

    const product = await Product.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ product });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Product.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class CommodityController {
  async create(req, res) {
    req.body.creator_id = req.user.user_id;
    const commodity = await Commodity.create(req.body, { new: true });
    res.status(201).json({ commodity });
  }

  async select(req, res) {
    // TODO: uri includes 'korean' decode
    const commodities = await Commodity.select(req.query, {
      created_at: "desc",
    });
    res.status(200).json({ commodities });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const commodity = await Commodity.selectById(id);
    if (!commodity) {
      throw new CustomError.NotFoundError("Commodity not found");
    }
    res.status(200).json({ commodity });
  }

  async update(req, res) {
    const { id } = req.params;

    const commodity = await Commodity.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ commodity });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Commodity.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class TankController {
  async create(req, res) {
    const tank = await Tank.create(req.body, { new: true });
    res.status(201).json({ tank });
  }

  async select(req, res) {
    const tanks = await Tank.select({}, { created_at: "desc" });
    res.status(200).json({ tanks });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const tank = await Tank.selectById(id);
    if (!tank) {
      throw new CustomError.NotFoundError("tank not found");
    }
    res.status(200).json({ tank });
  }

  async update(req, res) {
    const { id } = req.params;

    const tank = await Tank.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ tank });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Tank.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }
}

class ItemController {
  async create(req, res) {
    req.body.creator_id = req.user.user_id;
    const item = await Item.create(req.body, { new: true });
    res.status(201).json({ item });
  }

  async select(req, res) {
    const items = await Item.select(req.query, { kind: "asc" });
    res.status(200).json({ items });
  }

  async selectById(req, res) {
    const { id } = req.params;

    const item = await Item.selectById(id);
    if (!item) {
      throw new CustomError.NotFoundError("Item not found");
    }
    res.status(200).json({ item });
  }

  async update(req, res) {
    const { id } = req.params;

    const item = await Item.selectByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ item });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Item.selectByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  }

  selectEnums(req, res) {
    res.status(200).json({ enums: Item.enums });
  }
}

export const itemController = new ItemController();
export const tankController = new TankController();
export const commodityController = new CommodityController();
export const productController = new ProductController();
export const clientController = new ClientController();
export const genreController = new GenreController();
export const videoController = new VideoController();
export const imageController = new ImageController();
export const userController = new UserController();
export const authController = new AuthController();
