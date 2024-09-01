import "./videos/addVideo";
import "./videos/play";
import "./videos/expand";
import "./videos/showPopup";
import "./videos/duration";
import "./videos/drag";
import "./videos/socket";

import "./genres/createGenre";

document.addEventListener("keydown", (event) => {
  const { code } = event;

  if (code === "ArrowRight") {
    closure.videoDOM.currentTime += 10;
    return;
  }

  if (code === "ArrowLeft") {
    closure.videoDOM.currentTime -= 10;
    return;
  }

  if (code === "Space") {
    closure.handlers.playVideo();
    return;
  }
});
