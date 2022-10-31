import request from "supertest";
import app from "./app";

describe("GET /", () => {
  it("should return response with HTML file", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toEqual(200);
    expect(response.type).toBe("text/html");
    expect(response.text).toMatch("Node Mongo OAuth Google starter");
  });
});

describe("route /api", () => {
  it("should return 401 Unauthorized if user is not logged in", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Cookie", "test123");

    expect(response.statusCode).toBe(401);
    expect(response.text).toContain("You must be logged in!");
  });
});
