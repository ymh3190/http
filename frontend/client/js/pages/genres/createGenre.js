import { formDOMs, inputDOMs } from "../../dom";
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

    const { video_id } = window.closure;
    if (!video_id) {
      return;
    }

    const { name } = values;

    const response = await FetchAPI.post("/genres", { name, video_id });
    if (response) {
      const data = await response.json();
    }
    setValues({
      name: "",
    });

    window.closure.video_id = "";
    formDOMs["genre-contents"].classList.add("hidden");
  }
}

const { handleChange, handleSubmit } = new Create();

closure.handlers.createGenre = handleSubmit;

formDOMs["genre-contents"].addEventListener("submit", handleSubmit);
inputDOMs["name-popup"].addEventListener("change", handleChange);
