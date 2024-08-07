import { readdirSync /* renameSync */ } from "fs";
import FetchAPI from "./fetch-api";
// import { v1 as uuidv1 } from "uuid";

(async () => {
  // const createId = () => {
  //   const layouts = uuidv1().split("-");
  //   const id = layouts[2] + layouts[1] + layouts[0] + layouts[3] + layouts[4];
  //   return id;
  // };

  const videos = readdirSync("static/videos").filter((video) => {
    if (!video.includes(".DS_Store")) {
      return video;
    }
  });

  for (const video of videos) {
    const [file, ext] = video.split(".");
    try {
      await FetchAPI.get(`/videos/${file}`);
    } catch (error) {
      const path = `/static/videos/${file}.${ext}`;
      await FetchAPI.post("/videos", { file, path });
      // await FetchAPI.post("/videos", { path });
      // const id = createId();
      // const path = `/static/videos/${id}.${ext}`;
      // await FetchAPI.post("/videos", { id, path });
      // const oldPath = `static/videos/${file}.${ext}`;
      // const newPath = `static/videos/${id}.${ext}`;
      // renameSync(oldPath, newPath);
    }
  }

  const images = readdirSync("static/images").filter((image) => {
    if (!image.includes(".DS_Store")) {
      return image;
    }
  });

  for (const image of images) {
    const [file, ext] = image.split(".");
    try {
      await FetchAPI.get(`/images/${file}`);
    } catch (error) {
      const path = `/static/images/${file}.${ext}`;
      await FetchAPI.post("/images", { file, path });
      // const id = createId();
      // const path = `/static/images/${id}.${ext}`;
      // await FetchAPI.post("/images", { id, path });
      // const oldPath = `static/images/${file}.${ext}`;
      // const newPath = `static/images/${id}.${ext}`;
      // renameSync(oldPath, newPath);
    }
  }
})();
