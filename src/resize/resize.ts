import { ParsedQs } from "qs";
import sharp from "sharp";
import express from "express";

const cachedUrls: ParsedQs[] = [];

async function resizeImage(
  imageName: string,
  imageWidth: number,
  imageHeight: number
): Promise<boolean> {
  try {
    await sharp(`public/full/${imageName}.jpg`)
      .resize(imageWidth, imageHeight)
      .toFile(
        `public/thumb/${imageName + "" + imageWidth + "X" + imageHeight}.jpg`
      );
    return true;
  } catch (error) {
    return false;
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
