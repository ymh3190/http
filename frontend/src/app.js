import server from "./server";
import "./dom-sync";
import "./disk";
// import FetchAPI from "./fetch-api";

(async () => {
  try {
    server.listen();
    // const [clientRes, itemRes] = await Promise.all([
    //   FetchAPI.get("/clients/enums"),
    //   FetchAPI.get("/items/enums"),
    // ]);

    // let data = await clientRes.json();
    // global.clientTypes = data.enums.type;

    // data = await itemRes.json();
    // global.itemTypes = data.enums.type;
  } catch (error) {
    console.log(error);
  }
})();
