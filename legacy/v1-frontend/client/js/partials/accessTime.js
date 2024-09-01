import { headerDOM } from "../dom";
import { getDateTime } from "../util";

(() => {
  const accessTimeDOM = headerDOM.querySelector("#accessTime");
  const accessTime = sessionStorage.getItem("access_time");

  if (accessTime) {
    accessTimeDOM.textContent = `접속시간 ${accessTime}`;
    return;
  }

  const dateTime = getDateTime();
  sessionStorage.setItem("access_time", dateTime);
  accessTimeDOM.textContent = `접속시간 ${dateTime}`;
})();
