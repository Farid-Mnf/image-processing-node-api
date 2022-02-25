import supertest from "supertest";
import server from "../index";

const req = supertest(server);

describe("indexSpec suite", () => {
  it("test content-length", async () => {
    const res = await req.get("/api?image=palmtunnel&width=200&height=200");

    expect(res.headers["content-length"]).toEqual("15722");
  });

  it("test content-type", async () => {
    const res = await req.get("/api?image=palmtunnel&width=200&height=200");

    expect(res.headers["content-type"]).toEqual("image/jpeg");
  });

  it("test status code 200", async () => {
    const res = await req.get("/api?image=palmtunnel&width=200&height=200");

    expect(res.statusCode).toEqual(200);
  });
  
  it("test invalid request", async () => {
    const res = await req.get("/api?image=323432&width=200&height=200");
    
    expect(res.text).toEqual("missing or invalid image data");
  });
});
