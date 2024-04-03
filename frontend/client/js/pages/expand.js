import { iconDOMs, pageDOMs, tempDOMs } from "../dom";

class Expand {
  async handleClick(event) {
    console.log(event.currentTarget);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

const { handleClick } = new Expand();

closure.handlers.expand = handleClick;

const expandDOMs = pageDOMs["video-page"].querySelectorAll("button#expand");
expandDOMs.forEach((expandDOM) => {
  expandDOM.addEventListener("click", handleClick);
});
