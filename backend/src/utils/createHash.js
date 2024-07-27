const crypto = require("crypto");

export const hashString = (string) =>
  crypto.createHash("md5").update(string).digest("hex");
