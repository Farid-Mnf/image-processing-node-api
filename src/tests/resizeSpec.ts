import { resizeImage } from "../resize/resize";
import { promises as fsPromises } from 'fs';

describe("resizeSpec suite", () => {
  it("test resizeImage() with valid value", async function () {
      
      await resizeImage('palmtunnel', 200, 200).then((value) => {
        expect(value).toBeTrue();
      });
      
  });

  it("test resizeImage() with wrong value", async function () {
      
    await resizeImage('wrong image name', 200, 200).then((value) => {
      expect(value).toBeFalse();
    });
    
});

});
