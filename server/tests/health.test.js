const request = require("supertest");
const { app } = require("../app");

describe("health route", () => {
  it("returns API status", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("karebraids-api");
  });
});
