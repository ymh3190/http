import FetchAPI from "../fetch-api";
import { selectDOMs } from "../dom";
import { encode } from "../util";

const fetchItems = async (value, dom) => {
  selectDOMs[dom].querySelectorAll("option").forEach((optionDOM) => {
    optionDOM.remove();
  });

  if (!value) {
    return;
  }

  const query = `?type=${value}`;
  const response = await FetchAPI.get("/items" + encodeURI(query));
  if (response) {
    const data = await response.json();

    if (dom === "item_id-header") {
      const optionDOM = document.createElement("option");
      optionDOM.value = "";
      selectDOMs[dom].append(optionDOM);
    }

    data.items.forEach((item, i) => {
      const optionDOM = document.createElement("option");
      optionDOM.value = encode(item.id);
      optionDOM.textContent = item.kind;
      selectDOMs[dom].append(optionDOM);
      if (i === 0) {
        selectDOMs[dom].dispatchEvent(new Event("change"));
      }
    });
  }
};

export default fetchItems;
