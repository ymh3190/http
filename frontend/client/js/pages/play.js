import { iconDOMs, pageDOMs, tempDOMs } from "../dom";

class Play {
  async handleClick(event) {
    const videoDOM = event.currentTarget;

    if (videoDOM.paused) {
      videoDOM.play();
      return;
    }

    videoDOM.pause();
  }
}

const { handleClick } = new Play();

closure.handlers.playVideo = handleClick;

const videoDOMs = pageDOMs["video-page"].querySelectorAll("video");
videoDOMs.forEach((videoDOM) => {
  videoDOM.addEventListener("click", handleClick);
  videoDOM.addEventListener("click", handleClick);
});
