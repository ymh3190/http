import { iconDOMs } from "../dom";
import { signout } from "../off-loads/auth";

class Signout {
  async handleClick(event) {
    event.preventDefault();

    const response = await signout();
    if (response) {
      sessionStorage.removeItem("access_time");
      window.location.href = "/";
    }
  }
}

const { handleClick } = new Signout();

iconDOMs["signout-header"].addEventListener("click", handleClick);
