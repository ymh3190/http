const catchResponseError = async (response) => {
  if (response?.status > 399) {
    const data = await response.json();
    alert(data.message);
    return;
  }

  if (!response) {
    alert("Network response error");
  }
};

class FetchAPI {
  static #url = `${window.location.origin}/api/v1`;
  /**
   *
   * @param {string} path /api/v1 + path
   * @returns
   */
  static async get(path) {
    const response = await fetch(FetchAPI.#url + path, {
      credentials: "include",
    });
    if (response?.ok) {
      return response;
    }
    await catchResponseError(response);
  }

  /**
   *
   * @param {string} path /api/v1 + path
   * @param {{}} data
   * @returns
   */
  static async post(path, data) {
    const response = await fetch(FetchAPI.#url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (response?.ok) {
      return response;
    }
    await catchResponseError(response);
  }

  /**
   *
   * @param {string} path /api/v1 + path
   * @param {{}} data
   * @returns
   */
  static async patch(path, data) {
    const response = await fetch(FetchAPI.#url + path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (response?.ok) {
      return response;
    }
    await catchResponseError(response);
  }

  /**
   *
   * @param {string} path /api/v1 + path
   * @param {{}} data
   * @returns
   */
  static async put(path, data) {
    const response = await fetch(FetchAPI.#url + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (response?.ok) {
      return response;
    }
    await catchResponseError(response);
  }

  /**
   *
   * @param {string} path /api/v1 + path
   * @returns
   */
  static async delete(path) {
    const response = await fetch(FetchAPI.#url + path, {
      method: "DELETE",
      credentials: "include",
    });
    if (response?.ok) {
      return response;
    }
    await catchResponseError(response);
  }
}

export default FetchAPI;
