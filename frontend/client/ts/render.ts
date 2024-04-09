import { encode } from "./util";

const render = (doms, data, type, handler) => {
  if (doms && data && type && handler) {
    doms.forEach((dom, i) => {
      if (i === 0) {
        dom.dataset.id = encode(data[0]);
        dom.addEventListener(type, handler);
        return;
      }

      if (typeof data[i] === "object") {
        dom.dataset.id = encode(data[i][0]);
        dom.textContent = data[i][1];
      } else {
        dom.textContent = data[i];
      }
    });
    return;
  }

  if (doms && data) {
    doms.forEach((dom, i) => {
      dom.textContent = data[i];
    });
    return;
  }

  console.log("Arguments length error");
};

export default render;
