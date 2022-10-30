import request from "supertest";
import app from "./app";

describe("GET endpoint /", () => {
  it("should return 200 and html file", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toEqual(200);
    expect(response.type).toBe("text/html");
    expect(response.text).toMatch("Node Mongo OAuth Google starter");
  });
});
