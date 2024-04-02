import {
  inputDOMs,
  formDOMs,
  selectDOMs,
  divDOMs,
  tempDOMs,
  btnDOMs,
} from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import clone from "../../clone";
import fetchItems from "../../off-loads/fetch-items";
import { decode } from "../../util";

const [values, setValues] = useState({
  "type-header": "",
  "item_id-header": "",
  "name-header": "",
});

class Selects {
  handleChange(event) {
    if (event.target.name === "type") {
      fetchItems(event.target.value, "item_id-header");
    }
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const item_id = decode(values.item_id);
    const { type, name } = values;

    let itemQuery = "";
    if (type) {
      itemQuery += `?type=${type}`;
    }

    let commodityQuery = "";
    if (item_id && name) {
      commodityQuery += `?item_id=${item_id}&name=%${name}%`;
    } else if (item_id) {
      commodityQuery += `?item_id=${item_id}`;
    } else if (name) {
      commodityQuery += `?name=%${name}%`;
    }

    const [itemRes, commodityRes] = await Promise.all([
      FetchAPI.get("/items" + itemQuery),
      FetchAPI.get("/commodities" + commodityQuery),
    ]);

    if (itemRes && commodityRes) {
      let data = await itemRes.json();
      const items = data.items;

      data = await commodityRes.json();
      const commodities = data.commodities;
      for (let i = 0; i < commodities.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (commodities[i].item_id === items[j].id) {
            commodities[i].type = items[j].type;
            break;
          }
        }
      }

      divDOMs["row-list"].querySelectorAll(".wrapper-row").forEach((divDOM) => {
        divDOM.remove();
      });

      commodities
        .filter((commodity) => commodity.type)
        .forEach((commodity) => {
          const { id, item_id, type, name, unit, price } = commodity;

          const data = [id, [item_id, type], name, unit, price];
          const temp = tempDOMs["row-list"];
          const { selectCommodity } = closure.handlers;
          const outHtml = divDOMs["row-list"];

          clone("span", data, temp, ".list", { outHtml }, selectCommodity);
        });
    }
  }

  handleClick(event) {
    handleSubmit(event);
  }
}

const { handleChange, handleSubmit, handleClick } = new Selects();

formDOMs["search-commodity"].addEventListener("submit", handleSubmit);
btnDOMs["search-header"].addEventListener("click", handleClick);

selectDOMs["type-header"].addEventListener("change", handleChange);
selectDOMs["item_id-header"].addEventListener("change", handleChange);
inputDOMs["name-header"].addEventListener("change", handleChange);
