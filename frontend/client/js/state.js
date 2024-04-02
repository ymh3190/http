import { inputDOMs, selectDOMs, textareaDOMs } from "./dom";

const { user } = closure;

/**
 *
 * @param {*} args
 * @returns {[{}, Function]}
 */
const useState = (args) => {
  if (args) {
    const values = {};
    const keys = {};
    for (const [key, value] of Object.entries(args)) {
      keys[key.match(/\w+/)] = key.match(/\w+$/).join("");
      values[key.match(/\w+/)] = value;

      // if (inputDOMs[key]) {
      //   Object.values(inputDOMs[key]).forEach(
      //     (inputDOM) => (inputDOM.value = value)
      //   );
      // }
    }

    /**
     *
     * @param {{}} arg
     */
    const setValues = (arg) => {
      for (const [key, value] of Object.entries(arg)) {
        if (inputDOMs[`${key}-${keys[key]}`]) {
          inputDOMs[`${key}-${keys[key]}`].value = value;
          values[key] = value;
          continue;
        }
        if (selectDOMs[`${key}-${keys[key]}`]) {
          selectDOMs[`${key}-${keys[key]}`].value = value;
          values[key] = value;
          continue;
        }

        if (textareaDOMs[`${key}-${keys[key]}`]) {
          textareaDOMs[`${key}-${keys[key]}`].value = value;
          values[key] = value;
        }
      }
    };

    return [values, setValues];
  }

  const setUser = (arg) => {
    if (arg) {
      for (const [key, value] of Object.entries(arg)) {
        user[key] = value;
      }
      return;
    }
    for (const key of Object.keys(user)) {
      delete user[key];
    }
  };
  return [user, setUser];
};

export { useState };
