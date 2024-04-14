import "../closure";
import "../script";

import FetchAPI from "../fetch-api";
import { inputDOMs, formDOMs, tempDOMs } from "../dom";
import { useState } from "../state";

const [values, setValues] = useState({
  "name-header": "",
});

class Search {
  handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { name } = values;
    if (!name) {
      return;
    }

    // let genres, videos;
    // const videosLength = closure.videos.length;

    // const [genreRes, videoRes] = await Promise.all([
    //   FetchAPI.get("/genres?" + encodeURI(`name=%25${name}%25`)),
    //   FetchAPI.get("/videos?" + encodeURI(`limit=0&limit=${videosLength}`)),
    // ]);
    // if (genreRes && videoRes) {
    //   let data = await genreRes.json();
    //   genres = data.genres;

    //   data = await videoRes.json();
    //   videos = data.videos;

    //   const containerDOMs = document.querySelectorAll(".container");
    //   containerDOMs.forEach((containerDOM) => {
    //     containerDOM.remove();
    //   });

    //   const { playVideo, showPopup, fullscreen } = closure.handlers;

    //   const contentsDOM = document.querySelector(".contents");
    //   videos.forEach((video) => {
    //     genres.forEach((genre) => {
    //       if (video.id === genre.video_id) {
    //         const containerDiv = document.createElement("div");
    //         containerDiv.classList.add("container");
    //         const videoEl = document.createElement("video");
    //         videoEl.src = video.path;
    //         videoEl.addEventListener("click", playVideo);
    //         const clone = tempDOMs["controls-contents"].content.cloneNode(true);
    //         clone.querySelector("#plus").addEventListener("click", showPopup);
    //         clone
    //           .querySelector("#expand")
    //           .addEventListener("click", fullscreen);
    //         containerDiv.append(videoEl, clone);
    //         contentsDOM.insertAdjacentElement("afterbegin", containerDiv);
    //       }
    //     });
    //   });
    // }

    const { pathname } = location;
    if (pathname === "/videos") {
      const response = await FetchAPI.get(
        "/videos?" + encodeURI(`name=%25${name}%25`)
      );
      if (response) {
        const data = await response.json();

        const containerDOMs = document.querySelectorAll(".container");
        containerDOMs.forEach((containerDOM) => {
          containerDOM.remove();
        });

        const {
          playVideo,
          showPopup,
          fullscreen,
          dblFullscreen,
          duration,
          timeUpdate,
        } = closure.handlers;

        const contentsDOM = document.querySelector(".contents");
        data.videos.forEach((video) => {
          const containerDiv = document.createElement("div");
          containerDiv.classList.add("container");
          const videoEl = document.createElement("video");
          videoEl.src = video.path;
          videoEl.loop = true;
          videoEl.addEventListener("click", playVideo);
          videoEl.addEventListener("dblclick", dblFullscreen);
          videoEl.addEventListener("loadedmetadata", duration);
          videoEl.addEventListener("timeupdate", timeUpdate);
          const clone = tempDOMs["controls-contents"].content.cloneNode(true);
          clone.querySelector("#plus").addEventListener("click", showPopup);
          clone.querySelector("#expand").addEventListener("click", fullscreen);
          containerDiv.append(videoEl, clone);
          contentsDOM.insertAdjacentElement("afterbegin", containerDiv);
        });
      }
      return;
    }

    if (pathname === "/images") {
      const response = await FetchAPI.get(
        "/images?" + encodeURI(`name=%25${name}%25`)
      );
      if (response) {
        const data = await response.json();

        const containerDOMs = document.querySelectorAll(".container");
        containerDOMs.forEach((containerDOM) => {
          containerDOM.remove();
        });

        const { showPopup } = closure.handlers;

        const contentsDOM = document.querySelector(".contents");
        data.images.forEach((image) => {
          const containerDiv = document.createElement("div");
          containerDiv.classList.add("container");
          const imageEl = document.createElement("img");
          imageEl.src = image.path;
          const clone = tempDOMs["controls-contents"].content.cloneNode(true);
          clone.querySelector("#plus").addEventListener("click", showPopup);
          containerDiv.append(imageEl, clone);
          contentsDOM.insertAdjacentElement("afterbegin", containerDiv);
        });
      }
      return;
    }
  }
}

const { handleChange, handleSubmit } = new Search();

formDOMs["search-header"].addEventListener("submit", handleSubmit);
inputDOMs["name-header"].addEventListener("change", handleChange);
