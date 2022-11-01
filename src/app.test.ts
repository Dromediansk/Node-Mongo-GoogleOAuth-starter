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

describe("/auth", () => {
  it("should redirect to Google login", async () => {
    const response = await request(app).get("/auth/google");

    expect(response.statusCode).toBe(302);
    expect(response.header.location).toContain(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
  });

  it("should redirect to / on logout", async () => {
    const response = await request(app).get("/auth/logout");

    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe("/");
  });
});

describe("/api", () => {
  it("should return 401 Unauthorized if user is not logged in", async () => {
    const response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(401);
    expect(response.text).toContain("You must be logged in!");
  });
});

describe("General error handling", () => {
  it("should return 404 error if route does not exist", async () => {
    const response = await request(app).get("/non-existing-path");

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("404. The page was not found.");
  });
});
