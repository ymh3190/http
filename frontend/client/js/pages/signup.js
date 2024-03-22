import "../closure";
import { signup } from "../off-loads/auth";
import { inputDOMs, formDOMs } from "../dom";
import { useState } from "../state";
import alarm from "../alarm";

const [values, setValues] = useState({
  "username-signup": "",
  "password-signup": "",
  "rePassword-signup": "",
});

class Signup {
  async handleSubmit(event) {
    event.preventDefault();

    const { username, password, rePassword } = values;
    if (alarm({ username, password, rePassword })) {
      return;
    }

    if (password !== rePassword) {
      alert("Password does not match");
      return;
    }

    const response = await signup({ username, password });
    if (response) {
      setValues({ username: "", password: "", rePassword: "" });
      window.location.href = "/signin";
    }
  }

  handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
}

const { handleSubmit, handleChange } = new Signup();

formDOMs["signup-signup"].addEventListener("submit", handleSubmit);
inputDOMs["username-signup"].addEventListener("change", handleChange);
inputDOMs["password-signup"].addEventListener("change", handleChange);
inputDOMs["rePassword-signup"].addEventListener("change", handleChange);
