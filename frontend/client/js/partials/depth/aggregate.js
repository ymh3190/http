import { btnDOMs, ulDOMs } from "../../dom";

class Aggregate {
  handleClick() {
    if (!ulDOMs["aggregate-depth"].classList.contains("hidden")) {
      ulDOMs["aggregate-depth"].classList.add("hidden");
      localStorage.setItem("aggregate-depth", "hidden");
      return;
    }

    if (localStorage.getItem("aggregate-depth") === "hidden") {
      localStorage.removeItem("aggregate-depth");
      ulDOMs["aggregate-depth"].classList.remove("hidden");
    }
  }
}

const { handleClick } = new Aggregate();

btnDOMs["aggregate-depth"].addEventListener("click", handleClick);

if (localStorage.getItem("aggregate-depth") === "hidden") {
  ulDOMs["aggregate-depth"].classList.add("hidden");
}
