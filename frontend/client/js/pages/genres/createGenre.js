import { popupDOMs, inputDOMs } from "../../dom";
import FetchAPI from "../../fetch-api";
import { useState } from "../../state";

const [values, setValues] = useState({
  "name-popup": "",
});

class Create {
  handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { video_id, image_id } = window.closure;
    if (!video_id && !image_id) {
      return;
    }

    const { name } = values;
    if (video_id) {
      const response = await FetchAPI.post("/genres", { name, video_id });
      console.log(response);
      if (response) {
        const data = await response.json();
        console.log(data);
      }
      setValues({
        name: "",
      });

      window.closure.video_id = "";
      popupDOMs["genre-contents"].classList.add("hidden");
      return;
    }

    if (image_id) {
      const response = await FetchAPI.post("/genres", { name, image_id });
      if (response) {
        const data = await response.json();
      }
      setValues({
        name: "",
      });

      window.closure.image_id = "";
      popupDOMs["genre-contents"].classList.add("hidden");
      return;
    }
  }
}

const { handleChange, handleSubmit } = new Create();

closure.handlers.createGenre = handleSubmit;

popupDOMs["genre-contents"].addEventListener("submit", handleSubmit);
inputDOMs["name-popup"].addEventListener("change", handleChange);
