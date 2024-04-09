import {
  btnDOMs,
  inputDOMs,
  tempDOMs,
  divDOMs,
  selectDOMs,
  textareaDOMs,
} from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { isExists } from "../../util";
import clone from "../../clone";

const [values, setValues] = useState({
  "company-detail": "",
  "address-detail": "",
  "type-detail": "",
  "tel-detail": "",
  "fax-detail": "",
  "tax_no-detail": "",
  "corp_no-detail": "",
  "manager_name-detail": "",
  "manager_tel-detail": "",
  "ceo_name-detail": "",
  "ceo_tel-detail": "",
  "comment-detail": "",
});

class Create {
  handleChange(event) {
    if (isExists(closure.client)) {
      return;
    }
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleClick(event) {
    if (btnDOMs["create-detail"] === event.currentTarget) {
      setValues({
        company: "",
        address: "",
        type: "",
        tel: "",
        fax: "",
        tax_no: "",
        corp_no: "",
        manager_name: "",
        manager_tel: "",
        ceo_name: "",
        ceo_tel: "",
        comment: "",
      });
      closure.clear();
      return;
    }

    if (isExists(closure.client)) {
      return;
    }

    if (!values.company) {
      alert("Provide company");
      inputDOMs["company-detail"].focus();
      return;
    }

    values.address = values.address.trim();

    const response = await FetchAPI.post("/clients", values);
    if (response) {
      const data = await response.json();
      const { id, type, company, manager_name, manager_tel } = data.client;

      setValues({
        company: "",
        address: "",
        type: "",
        tel: "",
        fax: "",
        tax_no: "",
        corp_no: "",
        manager_name: "",
        manager_tel: "",
        ceo_name: "",
        ceo_tel: "",
        comment: "",
      });

      const dataset = [id, type, company, manager_name, manager_tel];
      const temp = tempDOMs["list-client"];
      const outHtml = divDOMs["list-client"];
      const { selectClient } = closure.handlers;
      const sort = true;
      clone("span", dataset, temp, ".list", { outHtml, sort }, selectClient);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    handleClick(event);
  }
}

const { handleClick, handleChange, handleSubmit } = new Create();

// formDOMs["saveUpdate-client"].addEventListener("submit", handleSubmit);
btnDOMs["save-detail"].addEventListener("click", handleClick);
btnDOMs["create-detail"].addEventListener("click", handleClick);

inputDOMs["company-detail"].addEventListener("change", handleChange);
inputDOMs["address-detail"].addEventListener("change", handleChange);
selectDOMs["type-detail"].addEventListener("change", handleChange);
inputDOMs["tel-detail"].addEventListener("change", handleChange);
inputDOMs["fax-detail"].addEventListener("change", handleChange);
inputDOMs["tax_no-detail"].addEventListener("change", handleChange);
inputDOMs["corp_no-detail"].addEventListener("change", handleChange);
inputDOMs["manager_name-detail"].addEventListener("change", handleChange);
inputDOMs["manager_tel-detail"].addEventListener("change", handleChange);
inputDOMs["ceo_name-detail"].addEventListener("change", handleChange);
inputDOMs["ceo_tel-detail"].addEventListener("change", handleChange);
textareaDOMs["comment-detail"].addEventListener("change", handleChange);
