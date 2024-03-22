import { btnDOMs, inputDOMs, tempDOMs, divDOMs, selectDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { decode, isExists } from "../../util";
import clone from "../../clone";
import fetchItems from "../../off-loads/fetch-items";

const [values, setValues] = useState({
  "name-detail": "",
  "item_id-detail": "",
  "unit-detail": "",
  "price-detail": "",
  "specification-detail": "",
  "stock-detail": "",
});

class Create {
  handleChange(event) {
    if (isExists(closure.commodity)) {
      return;
    }
    if (event.target.name === "type") {
      fetchItems(event.target.value, "item_id-detail");
    }
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleClick(event) {
    if (btnDOMs["create-detail"] === event.currentTarget) {
      setValues({
        name: "",
        item_id: "",
        unit: "",
        price: "",
        specification: "",
        stock: "",
      });

      selectDOMs["type-detail"]
        .querySelectorAll("option")
        .forEach((optionDOM) => {
          optionDOM.remove();
        });
      selectDOMs["item_id-detail"]
        .querySelectorAll("option")
        .forEach((optionDOM) => {
          optionDOM.remove();
        });

      const response = await FetchAPI.get("/items/enums");
      if (response) {
        const data = await response.json();

        const optionDOM = document.createElement("option");
        optionDOM.value = "";
        selectDOMs["type-detail"].append(optionDOM);
        data.enums.type.forEach((type) => {
          const optionDOM = document.createElement("option");
          optionDOM.value = type;
          optionDOM.textContent = type;
          selectDOMs["type-detail"].append(optionDOM);
        });
      }

      closure.clear();
      return;
    }

    if (isExists(closure.commodity)) {
      return;
    }

    // if (!values.name) {
    //   alert("Provide name");
    //   inputDOMs["name-detail"].focus();
    //   return;
    // }

    let { item_id } = values;
    item_id = decode(item_id);
    values.item_id = item_id;
    const [itemRes, commodityRes] = await Promise.all([
      FetchAPI.get(`/items/${item_id}`),
      FetchAPI.post("/commodities", values),
    ]);

    if (itemRes && commodityRes) {
      let data = await itemRes.json();
      const type = data.item.type;

      data = await commodityRes.json();
      const { id, name, unit, price } = data.commodity;

      setValues({
        name: "",
        item_id: "",
        unit: "",
        price: "",
        specification: "",
        stock: "",
      });

      selectDOMs["type-detail"].value = "";
      selectDOMs["item_id-detail"]
        .querySelectorAll("option")
        .forEach((optionDOM) => {
          optionDOM.remove();
        });

      const dataset = [id, [item_id, type], name, unit, price];
      const temp = tempDOMs["row-list"];
      const outHtml = divDOMs["row-list"];
      const { selectCommodity } = closure.handlers;
      const sort = true;
      clone("span", dataset, temp, ".list", { outHtml, sort }, selectCommodity);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    handleClick(event);
  }
}

const { handleClick, handleChange, handleSubmit } = new Create();

// formDOMs["saveUpdate-commodity"].addEventListener("submit", handleSubmit);
btnDOMs["save-detail"].addEventListener("click", handleClick);
btnDOMs["create-detail"].addEventListener("click", handleClick);

selectDOMs["type-detail"].addEventListener("change", handleChange);

inputDOMs["name-detail"].addEventListener("change", handleChange);
selectDOMs["item_id-detail"].addEventListener("change", handleChange);
inputDOMs["unit-detail"].addEventListener("change", handleChange);
inputDOMs["price-detail"].addEventListener("change", handleChange);
inputDOMs["specification-detail"].addEventListener("change", handleChange);
inputDOMs["stock-detail"].addEventListener("change", handleChange);
