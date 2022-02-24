import express from "express";
import { cachedUrls, resizeImage, findCached } from "./resize/resize";

const app = express();
const port = 3000;
const rootPath = process.env["INIT_CWD"];


const middleware = (req: express.Request, res: express.Response, next: Function) => {
  const queryString: string = req.query.image + "  " + req.query.width + "  " + req.query.height;
  console.log(queryString);

  const errorMsg = "missing or invalid image data";

  if (req.query.image == undefined
    || req.query.width == undefined
    || req.query.height == undefined) {
    res.send(errorMsg);
  } else {
    const image = req.query.image as string;
    const width = req.query.width as string;
    const height = req.query.height as string;

    if(image.trim().length == 0 || width.trim().length == 0 || height.trim().length == 0){
      res.send(errorMsg);
    }else if()

  }

}

app.get("/api", middleware, (req: express.Request, res: express.Response) => {
  res.send("api connected");
  /*
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
  } */
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
