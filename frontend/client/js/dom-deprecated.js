// input
export const inputDOMs = {};
document.querySelectorAll("input").forEach((inputDOM) => {
  const { id, classList } = inputDOM;
  if (id) {
    inputDOMs[`${id}-${classList[0]}`] = inputDOM;
  }
});

// select
export const selectDOMs = {};
document.querySelectorAll("select").forEach((selectDOM) => {
  const { id, classList } = selectDOM;
  if (id) {
    selectDOMs[`${id}-${classList[0]}`] = selectDOM;
  }
});

// textarea
export const textareaDOMs = {};
document.querySelectorAll("textarea").forEach((textareaDOM) => {
  const { id, classList } = textareaDOM;
  if (id) {
    textareaDOMs[`${id}-${classList[0]}`] = textareaDOM;
  }
});

// btn & icon
export const btnDOMs = {};
export const iconDOMs = {};
document.querySelectorAll("button").forEach((btnDOM) => {
  const { id, classList } = btnDOM;
  const iconDOM = btnDOM.querySelector("i");
  if (id) {
    btnDOMs[`${id}-${classList[0]}`] = btnDOM;
    iconDOMs[`${id}-${classList[0]}`] = iconDOM;
  }
});

// form
export const formDOMs = {};
document.querySelectorAll("form").forEach((formDOM) => {
  const { id, classList } = formDOM;
  if (id) {
    formDOMs[`${id}-${classList[0]}`] = formDOM;
  }
});

// link
export const linkDOMs = {};
document.querySelectorAll("a").forEach((linkDOM) => {
  const { id, classList } = linkDOM;
  if (id) {
    linkDOMs[`${id}-${classList[0]}`] = linkDOM;
  }
});

// ul
export const ulDOMs = {};
document.querySelectorAll("ul").forEach((ulDOM) => {
  const { id, classList } = ulDOM;
  if (id) {
    ulDOMs[`${id}-${classList[0]}`] = ulDOM;
  }
});

// div
export const divDOMs = {};
document.querySelectorAll("div").forEach((divDOM) => {
  const { id, classList } = divDOM;
  if (id) {
    divDOMs[`${id}-${classList[0]}`] = divDOM;
  }
});

// page
export const pageDOMs = {};
document.querySelectorAll("section").forEach((sectionDOM) => {
  const { id, classList } = sectionDOM;
  pageDOMs[`${id}-${classList[0]}`] = sectionDOM;
});

// template
export const tempDOMs = {};
document.querySelectorAll("template").forEach((tempDOM) => {
  const { id, classList } = tempDOM;
  tempDOMs[`${id}-${classList[0]}`] = tempDOM;
});

// partial
export const navDOM = document.getElementById("nav");
export const headerDOM = document.getElementById("header");
export const footerDOM = document.getElementById("footer");
