const OPEN = 1;

class Orderer {
  #fields;

  constructor() {
    this.#fields = [];
  }

  /**
   *
   * @param {WebSocket} field
   */
  addField(field) {
    this.#fields.push(field);
  }

  /**
   *
   * @param {WebSocket} field
   */
  removeField(field) {
    return this.#fields.filter((ws) => ws !== field);
  }

  /**
   *
   * @param {string} event
   */
  notifyFields(event) {
    this.#fields.forEach((ws) => {
      if (ws.readyState === OPEN) {
        ws.send(event);
      }
    });
  }
}

const orderer = new Orderer();
export default orderer;
