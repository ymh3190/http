import FetchAPI from "../fetch-api";

class Auth {
  async signin({ username, password }) {
    const response = await FetchAPI.post("/auth/signin", {
      username,
      password,
    });
    if (response) {
      return response;
    }
  }

  async signup({ username, password }) {
    const response = await FetchAPI.post("/auth/signup", {
      username,
      password,
    });
    if (response) {
      return response;
    }
  }

  async signout() {
    const response = await FetchAPI.delete("/auth/signout");
    if (response) {
      return response;
    }
  }
}

export const { signin, signup, signout } = new Auth();
