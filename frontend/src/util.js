class Util {
  detachCookiesToResponse = (res) => {
    res.cookie("access_token", "signout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.cookie("refresh_token", "signout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
  };

  getDateTime(dateTime = new Date()) {
    const years = dateTime.getFullYear();
    const months = String(dateTime.getMonth() + 1).padStart(2, "0");
    const dates = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    return `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`;
  }

  parseToken(token) {
    const decoded = Buffer.from(token.match(/\.(\w+)\./g).join(""), "base64");
    const payload = JSON.parse(decoded.toString("utf-8"));
    return payload;
  }
}

const util = new Util();
export default util;
