import { promises as fsPromises } from "fs";

async function getImages(): Promise<string[]> {
  const images: string[] = [];
  await fsPromises.readdir("./public/full").then((result) => {
    result.forEach((value) => {
      images.push(value.split(".")[0]);
    });
  });
  return images;
}

async function searchImage(image: string): Promise<boolean> {
  const images = await getImages();
  if (images.indexOf(image) < 0) {
    return false;
  }
  return true;
}

export { getImages, searchImage };
