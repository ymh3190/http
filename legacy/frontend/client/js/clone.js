import render from "./render";

const clone = (el, data, temp, inHtml, { outHtml, sort }, handler) => {
  const clone = temp.content.cloneNode(true);

  const elDOMs = clone.querySelectorAll(el);
  const doms = [clone.querySelector(inHtml), ...elDOMs];
  render(doms, data, "click", handler);
  if (sort) {
    outHtml.prepend(clone);
    return;
  }

  outHtml.append(clone);
};

export default clone;
