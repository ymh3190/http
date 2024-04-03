import { iconDOMs, pageDOMs } from "../dom";
import FetchAPI from "../fetch-api";

class Add {
  async handleClick() {
    const imageLength = pageDOMs["image-page"].querySelectorAll("img").length;
    const query = `?limit=${imageLength}&limit=5`;
    const response = await FetchAPI.get("/images" + encodeURI(query));
    if (response) {
      const data = await response.json();
      const btnDOM = pageDOMs["image-page"].querySelector(".wrapper-button");
      data.images.forEach((image) => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");
        const imageEl = document.createElement("img");
        imageEl.src = image.path;
        containerDiv.append(imageEl);
        btnDOM.insertAdjacentElement("beforebegin", containerDiv);
      });
    }
  }
}

const { handleClick } = new Add();

iconDOMs["add-contents"].addEventListener("click", handleClick);
