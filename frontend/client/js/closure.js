window.closure = {
  user: {},
  client: {},
  product: {},
  commodity: {},
  inHtml: "",
  outHtml: "",
  handlers: {},

  clear(clearOutHtml = false) {
    this.client = {};
    this.product = {};
    this.commodity = {};
    this.video = {};
    this.inHtml = "";
    if (clearOutHtml) {
      this.outHtml.remove();
    }
    this.outHtml = "";
  },
};
