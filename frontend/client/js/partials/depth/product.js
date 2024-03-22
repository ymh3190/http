import { btnDOMs, ulDOMs } from "../../dom";

class Product {
  handleClick() {
    if (!ulDOMs["product-depth"].classList.contains("hidden")) {
      ulDOMs["product-depth"].classList.add("hidden");
      localStorage.setItem("product-depth", "hidden");
      return;
    }

    if (localStorage.getItem("product-depth") === "hidden") {
      localStorage.removeItem("product-depth");
      ulDOMs["product-depth"].classList.remove("hidden");
    }
  }
}

const { handleClick } = new Product();

btnDOMs["product-depth"].addEventListener("click", handleClick);

if (localStorage.getItem("product-depth") === "hidden") {
  ulDOMs["product-depth"].classList.add("hidden");
}
