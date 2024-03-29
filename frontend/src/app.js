import server from "./server";
import "./dom-sync";
import FetchAPI from "./fetch-api";

(async () => {
  try {
    server.listen();
    // const response = await FetchAPI.get("/clients/enums");
    // const data = await response.json();
    // global.clientTypes = data.enums.type;

    const [clientRes, itemRes] = await Promise.all([
      FetchAPI.get("/clients/enums"),
      FetchAPI.get("/items/enums"),
    ]);
    let data = await clientRes.json();
    global.clientTypes = data.enums.type;

    data = await itemRes.json();
    global.itemTypes = data.enums.type;
  } catch (error) {
    console.log(error);
  }
})();
