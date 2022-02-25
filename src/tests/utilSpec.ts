import { searchImage, getImages } from "../util/util";

const getImagesResult = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

describe("utilSpec suite", () => {
  it("test getImages()", async () => {
    expect(await getImages()).toEqual(getImagesResult);
  });

  it("test searchImage(image) function", async () => {
    expect(await searchImage("palmtunnel")).toBeTrue();
    expect(await searchImage("palmtunne")).toBeFalse();
  });
});
