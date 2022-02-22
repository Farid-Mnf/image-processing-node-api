import express from 'express';
import { ParsedQs } from 'qs';
import sharp from 'sharp';

const app = express();
const port = 3000;
const cachedUrls: ParsedQs[] = [];
const rootPath = process.env["INIT_CWD"];


// make images public folder accessible
app.use(express.static('public'));



async function resizeImage(query: ParsedQs) {
  const imageName = query.image;
  const imageWidth = parseInt(query.width as string);
  const imageHeight = parseInt(query.height as string);

  try {
    await sharp(`public/full/${imageName}.jpg`)
      .resize(imageWidth, imageHeight)
      .toFile(`public/thumb/${imageName + '' + imageWidth + 'X' + imageHeight}.jpg`);
  } catch (error) {
    console.log(error);
  }
}

function findCached(req: express.Request): boolean {
  let found = false;
  for (let i = 0; i < cachedUrls.length; i++) {
    if (req.query.image == cachedUrls[i].image &&
      req.query.width == cachedUrls[i].width &&
      req.query.height == cachedUrls[i].height) {
      found = true;
    }
  }
  return found;
}


app.get("/api", (req, res) => {
  if (findCached(req)) {
    res.sendFile(rootPath + "/public/thumb/" + req.query.image + '' + req.query.width + 'X' + req.query.height + ".jpg");
  }
  else {
    resizeImage(req.query).then(() =>{
      cachedUrls.push(req.query); // cache url to cancel resizing next request
      res.sendFile(rootPath + "/public/thumb/" + req.query.image + '' + req.query.width + 'X' + req.query.height + ".jpg",);
    });

  }

});


app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
