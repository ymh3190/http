import { btnDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { isEmpty } from "../../util";

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

class Delete {
  async handleClick() {
    if (isEmpty(closure.client)) {
      return;
    }

    const id = closure.client.id;
    const response = await FetchAPI.delete(`/clients/${id}`);
    if (response) {
      const data = await response.json();
      setValues({ ...values });
      closure.clear(true);
      // alert(data.message);
    }
  }
}

const { handleClick } = new Delete();

btnDOMs["delete-detail"].addEventListener("click", handleClick);
