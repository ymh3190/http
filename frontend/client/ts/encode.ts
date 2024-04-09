import { divDOMs } from "./dom";

const encode = (dom) => {
  dom.dataset.id = btoa(dom.dataset.id);
};

// deprecated
divDOMs["client-list"].querySelectorAll("div.list").forEach(encode);
