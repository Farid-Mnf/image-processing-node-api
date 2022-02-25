import express from "express";
import { cachedUrls, resizeImage, findCached } from "./resize/resize";
import { searchImage } from "./util/util";

const app = express();
const port = 3000;
const rootPath = process.env["INIT_CWD"];

const middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const errorMsg = "missing or invalid image data";

  if (
    req.query.image == undefined ||
    req.query.width == undefined ||
    req.query.height == undefined
  ) {
    res.send(errorMsg);
  } else {
    const image = req.query.image as string;
    const width = req.query.width as string;
    const height = req.query.height as string;

    if (
      image.trim().length == 0 ||
      width.trim().length == 0 ||
      height.trim().length == 0
    ) {
      res.send(errorMsg);
    } else if (/^\d+$/.test(width) == false || /^\d+$/.test(height) == false) {
      // test width and height to contain only numbers
      res.send(errorMsg);
    } else if (parseInt(width) < 1 || parseInt(height) < 1) {
      res.send(errorMsg);
    } else {
      searchImage(image).then((value) => {
        if (!value) {
          res.send(errorMsg);
        } else {
          next();
        }
      });
    }
  }
};

app.get(
  "/api",
  middleware,
  (req: express.Request, res: express.Response): void => {
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
      const imageName = req.query.image as string;
      const imageWidth = parseInt(req.query.width as string);
      const imageHeight = parseInt(req.query.height as string);
      resizeImage(imageName, imageWidth, imageHeight).then(() => {
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
  }
);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
