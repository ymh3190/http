import { btnDOMs, ulDOMs } from "../../dom";

class Operation {
  handleClick() {
    if (!ulDOMs["operation-depth"].classList.contains("hidden")) {
      ulDOMs["operation-depth"].classList.add("hidden");
      localStorage.setItem("operation-depth", "hidden");
      return;
    }

    if (localStorage.getItem("operation-depth") === "hidden") {
      localStorage.removeItem("operation-depth");
      ulDOMs["operation-depth"].classList.remove("hidden");
    }
  }
}

const { handleClick } = new Operation();

btnDOMs["operation-depth"].addEventListener("click", handleClick);

if (localStorage.getItem("operation-depth") === "hidden") {
  ulDOMs["operation-depth"].classList.add("hidden");
}
