import { btnDOMs, ulDOMs } from "../../dom";

class Default {
  handleClick() {
    if (!ulDOMs["default-depth"].classList.contains("hidden")) {
      ulDOMs["default-depth"].classList.add("hidden");
      localStorage.setItem("default-depth", "hidden");
      return;
    }

    if (localStorage.getItem("default-depth") === "hidden") {
      localStorage.removeItem("default-depth");
      ulDOMs["default-depth"].classList.remove("hidden");
    }
  }
}

const { handleClick } = new Default();

btnDOMs["default-depth"].addEventListener("click", handleClick);
