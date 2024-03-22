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
  "company-detail": "",
  "address-detail": "",
  "type-detail": "",
  "tel-detail": "",
  "fax-detail": "",
  "tax_id-detail": "",
  "corp_id-detail": "",
  "manager_name-detail": "",
  "manager_tel-detail": "",
  "ceo_name-detail": "",
  "ceo_tel-detail": "",
  "comment-detail": "",
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
    const response = await FetchAPI.patch(`/clients/${id}`, values);
    if (response) {
      const data = await response.json();
      const { type, company, manager_name, manager_tel } = data.client;

      setValues({
        company: "",
        address: "",
        type: "",
        tel: "",
        fax: "",
        tax_id: "",
        corp_id: "",
        manager_name: "",
        manager_tel: "",
        ceo_name: "",
        ceo_tel: "",
        comment: "",
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

// formDOMs["saveUpdate-client"].addEventListener("submit", handleSubmit);
btnDOMs["save-detail"].addEventListener("click", handleClick);

inputDOMs["company-detail"].addEventListener("change", handleChange);
inputDOMs["address-detail"].addEventListener("change", handleChange);
selectDOMs["type-detail"].addEventListener("change", handleChange);
inputDOMs["tel-detail"].addEventListener("change", handleChange);
inputDOMs["fax-detail"].addEventListener("change", handleChange);
inputDOMs["tax_id-detail"].addEventListener("change", handleChange);
inputDOMs["corp_id-detail"].addEventListener("change", handleChange);
inputDOMs["manager_name-detail"].addEventListener("change", handleChange);
inputDOMs["manager_tel-detail"].addEventListener("change", handleChange);
inputDOMs["ceo_name-detail"].addEventListener("change", handleChange);
inputDOMs["ceo_tel-detail"].addEventListener("change", handleChange);
textareaDOMs["comment-detail"].addEventListener("change", handleChange);
