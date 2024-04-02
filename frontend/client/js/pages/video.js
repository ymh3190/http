import { iconDOMs, pageDOMs } from "../dom";
import FetchAPI from "../fetch-api";

class AddVideo {
  async handleClick() {
    const videoLength = pageDOMs["video-page"].querySelectorAll("video").length;
    const query = `?limit=${videoLength}&limit=5`;
    const response = await FetchAPI.get("/videos" + encodeURI(query));
    if (response) {
      const data = await response.json();
      const btnDOM = pageDOMs["video-page"].querySelector(".wrapper-button");
      data.videos.forEach((video) => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");
        const videoEl = document.createElement("video");
        videoEl.src = video.path;
        videoEl.controls = true;
        containerDiv.append(videoEl);
        btnDOM.insertAdjacentElement("beforebegin", containerDiv);
      });
    }
  }
}

const { handleClick } = new AddVideo();

iconDOMs["add-contents"].addEventListener("click", handleClick);
