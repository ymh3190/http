import { divDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { decode } from "../../util";

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

class Select {
  async handleClick(event) {
    const id = decode(event.currentTarget.dataset.id);
    closure.inHtml = event.currentTarget;
    closure.outHtml = event.currentTarget.parentNode;

    const response = await FetchAPI.get(`/clients/${id}`);
    if (response) {
      const data = await response.json();
      closure.client = data.client;
      Object.keys(values).forEach((key) => {
        values[key] = data.client[key];
      });
      setValues({ ...values });
    }
  }
}

const { handleClick } = new Select();

closure.handlers.selectClient = handleClick;

divDOMs["row-list"].querySelectorAll(".list").forEach((listDOM) => {
  listDOM.addEventListener("click", handleClick);
});
