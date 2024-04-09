import { btnDOMs, ulDOMs } from "../../dom";

class Commodity {
  handleClick() {
    if (!ulDOMs["commodity-depth"].classList.contains("hidden")) {
      ulDOMs["commodity-depth"].classList.add("hidden");
      localStorage.setItem("commodity-depth", "hidden");
      return;
    }

    if (localStorage.getItem("commodity-depth") === "hidden") {
      localStorage.removeItem("commodity-depth");
      ulDOMs["commodity-depth"].classList.remove("hidden");
    }
  }
}

const { handleClick } = new Commodity();

btnDOMs["commodity-depth"].addEventListener("click", handleClick);

if (localStorage.getItem("commodity-depth") === "hidden") {
  ulDOMs["commodity-depth"].classList.add("hidden");
}
