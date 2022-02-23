import express from "express";
import { cachedUrls, resizeImage, findCached } from "./resize/resize";

const app = express();
const port = 3000;
const rootPath = process.env["INIT_CWD"];

app.get("/api", (req, res) => {
  if (findCached(req)) {
    res.sendFile(
      rootPath +
        "/public/thumb/" +
        req.query.image +
        "" +
        req.query.width +
        "X" +
        req.query.height +
        ".jpg"
    );
  } else {
    resizeImage(req.query).then(() => {
      cachedUrls.push(req.query); // cache current url to cancel resizing same request of the same url
      res.sendFile(
        rootPath +
          "/public/thumb/" +
          req.query.image +
          "" +
          req.query.width +
          "X" +
          req.query.height +
          ".jpg"
      );
    });
  }
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;