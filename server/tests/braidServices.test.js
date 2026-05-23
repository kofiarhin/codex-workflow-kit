const request = require("supertest");

jest.mock("../models/BraidService", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

const BraidService = require("../models/BraidService");
const { app } = require("../app");

function serviceDocument(overrides = {}) {
  const data = {
    id: "service-1",
    name: "Knotless waist-length braids",
    description: "Low-tension waist-length knotless braids with included finish.",
    durationMinutes: 300,
    priceDollars: 285,
    isActive: true,
    ...overrides
  };

  return {
    toPublicJSON: () => data
  };
}

describe("braid services routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("lists braid services sorted by name", async () => {
    const sort = jest.fn().mockResolvedValue([
      serviceDocument(),
      serviceDocument({
        id: "service-2",
        name: "Boho bob braids",
        durationMinutes: 210,
        priceDollars: 195
      })
    ]);
    BraidService.find.mockReturnValue({ sort });

    const response = await request(app).get("/api/braid-services").expect(200);

    expect(BraidService.find).toHaveBeenCalledWith({});
    expect(sort).toHaveBeenCalledWith({ name: 1 });
    expect(response.body.braidServices).toHaveLength(2);
    expect(response.body.braidServices[0]).toMatchObject({
      id: "service-1",
      name: "Knotless waist-length braids",
      priceDollars: 285
    });
  });

  it("creates a braid service", async () => {
    BraidService.create.mockResolvedValue(serviceDocument());

    const response = await request(app)
      .post("/api/braid-services")
      .send({
        name: " Knotless waist-length braids ",
        description: "Low-tension waist-length knotless braids with included finish.",
        durationMinutes: 300,
        priceDollars: 285,
        isActive: true
      })
      .expect(201);

    expect(BraidService.create).toHaveBeenCalledWith({
      name: "Knotless waist-length braids",
      description: "Low-tension waist-length knotless braids with included finish.",
      durationMinutes: 300,
      priceDollars: 285,
      isActive: true
    });
    expect(response.body.braidService.name).toBe("Knotless waist-length braids");
  });

  it("updates a braid service", async () => {
    BraidService.findByIdAndUpdate.mockResolvedValue(
      serviceDocument({ name: "Shoulder-length twists", priceDollars: 175 })
    );

    const response = await request(app)
      .patch("/api/braid-services/service-1")
      .send({ name: "Shoulder-length twists", priceDollars: 175 })
      .expect(200);

    expect(BraidService.findByIdAndUpdate).toHaveBeenCalledWith(
      "service-1",
      { $set: { name: "Shoulder-length twists", priceDollars: 175 } },
      { new: true, runValidators: true }
    );
    expect(response.body.braidService.priceDollars).toBe(175);
  });

  it("deletes a braid service", async () => {
    BraidService.findByIdAndDelete.mockResolvedValue(serviceDocument());

    const response = await request(app)
      .delete("/api/braid-services/service-1")
      .expect(200);

    expect(BraidService.findByIdAndDelete).toHaveBeenCalledWith("service-1");
    expect(response.body).toEqual({ ok: true });
  });

  it("rejects invalid braid service payloads", async () => {
    const response = await request(app)
      .post("/api/braid-services")
      .send({ name: "", durationMinutes: 0, priceDollars: -20 })
      .expect(400);

    expect(BraidService.create).not.toHaveBeenCalled();
    expect(response.body.error.code).toBe("INVALID_INPUT");
  });
});
