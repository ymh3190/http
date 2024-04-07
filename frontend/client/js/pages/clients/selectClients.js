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

const [values, setValues] = useState({
  "type-header": "",
  "company-header": "",
});

class Selects {
  handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { type, company } = values;

    let query = "";
    if (type && company) {
      query += `?type=${type}&company=%${company}%`;
    } else if (type) {
      query += `?type=${type}`;
    } else if (company) {
      query += `?company=%${company}%`;
    }

    const response = await FetchAPI.get("/clients" + encodeURI(query));
    if (response) {
      const data = await response.json();

      divDOMs["list-client"]
        .querySelectorAll(".wrapper-row")
        .forEach((divDOM) => {
          divDOM.remove();
        });

      data.clients.forEach((client) => {
        const { id, type, company, manager_name, manager_tel } = client;

        const data = [id, type, company, manager_name, manager_tel];
        const temp = tempDOMs["list-client"];
        const { selectClient } = closure.handlers;
        const outHtml = divDOMs["list-client"];

        clone("span", data, temp, ".list", { outHtml }, selectClient);
      });
    }
  }

  handleClick(event) {
    handleSubmit(event);
  }
}

const { handleChange, handleSubmit, handleClick } = new Selects();

btnDOMs["search-header"].addEventListener("click", handleClick);
formDOMs["search-client"].addEventListener("submit", handleSubmit);
inputDOMs["company-header"].addEventListener("change", handleChange);
selectDOMs["type-header"].addEventListener("change", handleChange);
