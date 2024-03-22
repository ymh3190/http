import {
  btnDOMs,
  inputDOMs,
  formDOMs,
  selectDOMs,
  textareaDOMs,
} from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { isEmpty } from "../../util";
import render from "../../render";

const [values, setValues] = useState({
  "name-detail": "",
  "type-detail": "",
  "item_id-detail": "",
  "unit-detail": "",
  "price-detail": "",
  "specification-detail": "",
  "stock-detail": "",
});

class Update {
  handleChange(event) {
    if (isEmpty(closure.client)) {
      return;
    }

    const { client } = closure;
    client[event.target.name] = event.target.value;
    Object.keys(values).forEach((key) => {
      values[key] = client[key];
    });
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleClick() {
    if (isEmpty(closure.client)) {
      return;
    }

    const { client, inHtml } = closure;
    Object.keys(values).forEach((key) => {
      values[key] = client[key];
    });
    const id = client.id;
    const response = await FetchAPI.patch(`/commodities/${id}`, values);
    if (response) {
      const data = await response.json();
      const { type, company, manager_name, manager_tel } = data.client;

      setValues({
        name: "",
        item_id: "",
        unit: "",
        price: "",
        specification: "",
        stock: "",
      });

      const spanDOMs = inHtml.querySelectorAll("span");
      render(spanDOMs, [type, company, manager_name, manager_tel]);
      closure.clear();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    handleClick();
  }
}

const { handleClick, handleChange, handleSubmit } = new Update();

formDOMs["saveUpdate-commodity"].addEventListener("submit", handleSubmit);
btnDOMs["save-detail"].addEventListener("click", handleClick);

inputDOMs["name-detail"].addEventListener("change", handleChange);
selectDOMs["item_id-detail"].addEventListener("change", handleChange);
inputDOMs["unit-detail"].addEventListener("change", handleChange);
inputDOMs["price-detail"].addEventListener("change", handleChange);
inputDOMs["specification-detail"].addEventListener("change", handleChange);
inputDOMs["stock-detail"].addEventListener("change", handleChange);
