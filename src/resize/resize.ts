import { ParsedQs } from "qs";
import sharp from "sharp";
import express from "express";

const cachedUrls: ParsedQs[] = [];

async function resizeImage(query: ParsedQs) {
  const imageName = query.image;
  const imageWidth = parseInt(query.width as string);
  const imageHeight = parseInt(query.height as string);

  try {
    await sharp(`public/full/${imageName}.jpg`)
      .resize(imageWidth, imageHeight)
      .toFile(
        `public/thumb/${imageName + "" + imageWidth + "X" + imageHeight}.jpg`
      );
  } catch (error) {
    console.log(error);
  }
}

function findCached(req: express.Request): boolean {
  let found = false;
  for (let i = 0; i < cachedUrls.length; i++) {
    if (
      req.query.image == cachedUrls[i].image &&
      req.query.width == cachedUrls[i].width &&
      req.query.height == cachedUrls[i].height
    ) {
      found = true;
    }
  }
  return found;
}

export { resizeImage, findCached, cachedUrls };
