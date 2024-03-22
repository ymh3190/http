import "./accessTime";
import "./signout";
import { ulDOMs } from "../dom";

const arrUl = [
  ulDOMs["default-ul"],
  ulDOMs["commodity-ul"],
  ulDOMs["operation-ul"],
  ulDOMs["product-ul"],
  ulDOMs["aggregate-ul"],
];

const arrDepth = [
  ulDOMs["default-depth"],
  ulDOMs["commodity-depth"],
  ulDOMs["operation-depth"],
  ulDOMs["product-depth"],
  ulDOMs["aggregate-depth"],
];

const addHiddenToUl = (...args) => {
  for (const ul of arrUl) {
    for (const arg of args) {
      if (ul === arg) {
        ul.classList.add("hidden");
      }
    }
  }
};

const removeHiddenToUl = (...args) => {
  for (const ul of arrUl) {
    for (const arg of args) {
      if (ul === arg) {
        ul.classList.remove("hidden");
      }
    }
  }
};

const removeHiddenToDepth = (...args) => {
  for (const ul of arrDepth) {
    for (const arg of args) {
      if (ul === arg) {
        ul.classList.remove("hidden");
      }
    }
  }
};

const execDefaut = () => {
  localStorage.removeItem("default-depth");
  removeHiddenToUl(ulDOMs["default-ul"]);
  removeHiddenToDepth(ulDOMs["default-depth"]);

  addHiddenToUl(
    ulDOMs["commodity-ul"],
    ulDOMs["operation-ul"],
    ulDOMs["product-ul"],
    ulDOMs["aggregate-ul"]
  );
};

const execCommodity = () => {
  localStorage.removeItem("commodity-depth");
  removeHiddenToUl(ulDOMs["commodity-ul"]);
  removeHiddenToDepth(ulDOMs["commodity-depth"]);

  addHiddenToUl(
    ulDOMs["default-ul"],
    ulDOMs["operation-ul"],
    ulDOMs["product-ul"],
    ulDOMs["aggregate-ul"]
  );
};

const execOperation = () => {
  localStorage.removeItem("operation-depth");
  removeHiddenToUl(ulDOMs["operation-ul"]);
  removeHiddenToDepth(ulDOMs["operation-depth"]);

  addHiddenToUl(
    ulDOMs["default-ul"],
    ulDOMs["commodity-ul"],
    ulDOMs["product-ul"],
    ulDOMs["aggregate-ul"]
  );
};

const execAggregate = () => {
  localStorage.removeItem("aggregate-depth");
  removeHiddenToUl(ulDOMs["aggregate-ul"]);
  removeHiddenToDepth(ulDOMs["aggregate-depth"]);

  addHiddenToUl(
    ulDOMs["default-ul"],
    ulDOMs["commodity-ul"],
    ulDOMs["operation-ul"],
    ulDOMs["product-ul"]
  );
};

const execProduct = () => {
  localStorage.removeItem("product-depth");
  removeHiddenToUl(ulDOMs["products-ul"]);
  removeHiddenToDepth(ulDOMs["products-depth"]);

  addHiddenToUl(
    ulDOMs["default-ul"],
    ulDOMs["commodity-ul"],
    ulDOMs["operation-ul"],
    ulDOMs["aggregate-ul"]
  );
};

(() => {
  const { pathname } = location;

  if (pathname === "/" && localStorage.getItem("default-depth") === "hidden") {
    ulDOMs["default-depth"].classList.add("hidden");
    return;
  }

  const isDefault =
    pathname === "/clients" ||
    pathname === "/commodities" ||
    pathname === "/products" ||
    pathname === "/tanks" ||
    pathname === "/users";

  if (isDefault) {
    execDefaut();
    return;
  }

  const isCommodity =
    pathname === "/commodities/order-plan" ||
    pathname === "/commodities/warehousing" ||
    pathname === "/commodities/forwarding" ||
    pathname === "/commodities/stock";
  if (isCommodity) {
    execCommodity();
    return;
  }

  const isOperation =
    pathname === "/operations/work-order" ||
    pathname === "/operations/pre-processing" ||
    pathname === "/operations/distillation" ||
    pathname === "/operations/boiler" ||
    pathname === "/operations/end";
  if (isOperation) {
    execOperation();
    return;
  }

  const isProduct =
    pathname === "/products/register" ||
    pathname === "/products/release" ||
    pathname === "/products/stock";
  if (isProduct) {
    execProduct();
    return;
  }

  const isAggregate =
    pathname === "/aggregates/process" ||
    pathname === "/aggregates/operation" ||
    pathname === "/aggregates/order" ||
    pathname === "/aggregates/boiler" ||
    pathname === "/aggregates/end";
  if (isAggregate) {
    execAggregate();
    return;
  }
})();
