/**
 *
 * @param {{}} arg
 * @returns
 */
const alarm = (arg) => {
  for (const [key, value] of Object.entries(arg)) {
    if (!value) {
      alert(`${key.replace(/^\w/, (str) => str.toUpperCase())} not found`);
      return true;
    }
  }
  return false;
};

export default alarm;
