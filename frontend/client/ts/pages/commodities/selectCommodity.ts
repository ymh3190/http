import { divDOMs, selectDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { decode } from "../../util";

const [values, setValues] = useState({
  "name-detail": "",
  "unit-detail": "",
  "price-detail": "",
  "specification-detail": "",
  "stock-detail": "",
});

class Select {
  async handleClick(event) {
    const { currentTarget } = event;
    const id = decode(currentTarget.dataset.id);
    closure.inHtml = currentTarget;
    closure.outHtml = currentTarget.parentNode;

    const itemId = decode(currentTarget.querySelectorAll("span")[0].dataset.id);

    const [commodityRes, itemRes] = await Promise.all([
      FetchAPI.get(`/commodities/${id}`),
      FetchAPI.get(`/items/${itemId}`),
    ]);
    if (commodityRes && itemRes) {
      let data = await itemRes.json();
      const item = data.item;

      data = await commodityRes.json();
      const commodity = data.commodity;

      selectDOMs["type-detail"]
        .querySelectorAll("option")
        .forEach((optionDOM) => {
          optionDOM.remove();
        });
      if (item.type) {
        const optionDOM = document.createElement("option");
        optionDOM.textContent = item.type;
        selectDOMs["type-detail"].append(optionDOM);
      }

      selectDOMs["item_id-detail"]
        .querySelectorAll("option")
        .forEach((optionDOM) => {
          optionDOM.remove();
        });
      if (item.kind) {
        const optionDOM = document.createElement("option");
        optionDOM.textContent = item.kind;
        selectDOMs["item_id-detail"].append(optionDOM);
      }

      closure.commodity = commodity;
      Object.keys(values).forEach((key) => {
        values[key] = commodity[key];
      });
      setValues({ ...values });
    }
  }
}

const { handleClick } = new Select();

closure.handlers.selectCommodity = handleClick;

divDOMs["list-commodity"].querySelectorAll(".list").forEach((listDOM) => {
  listDOM.addEventListener("click", handleClick);
});
