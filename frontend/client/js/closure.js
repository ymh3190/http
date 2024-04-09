window.closure = {
  user: {},

  client: {},
  product: {},
  commodity: {},
  video_id: "",
  image_id: "",
  inHtml: "",
  outHtml: "",
  handlers: {},

  clear(clearOutHtml = false) {
    this.client = {};
    this.product = {};
    this.commodity = {};
    this.video_id = "";
    this.image_id = "";
    this.inHtml = "";
    this.outHtml = "";
    this.handlers = {};

    if (clearOutHtml) {
      this.outHtml.remove();
      this.outHtml = "";
    }
  },
};
