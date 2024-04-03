import { iconDOMs, pageDOMs, tempDOMs } from "../dom";
import FetchAPI from "../fetch-api";

class Add {
  async handleClick() {
    const videoDOMs = pageDOMs["video-page"].querySelectorAll("video");
    const videoLength = videoDOMs.length;
    const query = `?limit=${videoLength}&limit=15`;
    const response = await FetchAPI.get("/videos" + encodeURI(query));
    if (response) {
      const data = await response.json();
      const wrapperBtnDOM = pageDOMs["video-page"].querySelector(
        ".contents > .wrapper-button"
      );
      const { playVideo } = closure.handlers;
      data.videos.forEach((video) => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");
        const videoEl = document.createElement("video");
        videoEl.src = video.path;
        videoEl.addEventListener("click", playVideo);
        const clone = tempDOMs["controls-contents"].content.cloneNode(true);
        containerDiv.append(videoEl, clone);
        wrapperBtnDOM.insertAdjacentElement("beforebegin", containerDiv);
      });
    }
  }
}

const { handleClick } = new Add();

iconDOMs["add-contents"].addEventListener("click", handleClick);
