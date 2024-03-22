import { useState } from "./state";

document.querySelectorAll("script").forEach((scriptDOM) => {
  if (scriptDOM.dataset) {
    Object.values(scriptDOM.dataset).forEach((value) => {
      if (value === "user") {
        const data = JSON.parse(scriptDOM.textContent);
        const [user, setUser] = useState(null);
        setUser(data.user);
        scriptDOM.textContent = "";
        scriptDOM.dataset.js = "";
        return;
      }
    });
  }
});
