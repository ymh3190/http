import "../closure";
import { signin } from "../off-loads/auth";
import { inputDOMs, formDOMs } from "../dom";
import { useState } from "../state";
import alarm from "../alarm";

const [values, setValues] = useState({
  "username-signin": "",
  "password-signin": "",
});

class Signin {
  async handleSubmit(event) {
    event.preventDefault();

    const { username, password } = values;
    if (alarm({ username, password })) {
      return;
    }

    const response = await signin({ username, password });
    if (response) {
      setValues({ username: "", password: "" });
      // window.location.href = "/";
    }
  }

  handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
}

const { handleSubmit, handleChange } = new Signin();

formDOMs["signin-signin"].addEventListener("submit", handleSubmit);
inputDOMs["username-signin"].addEventListener("change", handleChange);
inputDOMs["password-signin"].addEventListener("change", handleChange);
