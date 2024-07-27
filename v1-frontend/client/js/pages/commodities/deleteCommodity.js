import { btnDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";
import { isEmpty } from "../../util";

const [values, setValues] = useState({
  "name-detail": "",
  "type-detail": "",
  "item_id-detail": "",
  "unit-detail": "",
  "price-detail": "",
  "specification-detail": "",
  "stock-detail": "",
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
