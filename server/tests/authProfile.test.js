const request = require("supertest");

jest.mock("../models/User", () => ({
  findByIdAndUpdate: jest.fn()
}));

const User = require("../models/User");
const { app } = require("../app");
const { signAuthToken } = require("../utils/authToken");

function authHeader() {
  const token = signAuthToken({
    id: "user-1",
    email: "owner@forgeboard.test"
  });

  return `Bearer ${token}`;
}

function publicUser(avatarUrl = "") {
  return {
    toPublicJSON: () => ({
      id: "user-1",
      name: "Mara Voss",
      email: "owner@forgeboard.test",
      avatarUrl,
      notificationPreferences: {},
      createdAt: new Date("2026-05-11T00:00:00.000Z")
    })
  };
}

describe("auth profile route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates the authenticated user's avatar URL", async () => {
    User.findByIdAndUpdate.mockResolvedValue(
      publicUser("https://cdn.example.test/mara-voss.webp")
    );

    const response = await request(app)
      .patch("/api/auth/profile")
      .set("Authorization", authHeader())
      .send({ avatarUrl: " https://cdn.example.test/mara-voss.webp " })
      .expect(200);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user-1",
      { $set: { avatarUrl: "https://cdn.example.test/mara-voss.webp" } },
      { new: true, runValidators: true }
    );
    expect(response.body.user.avatarUrl).toBe("https://cdn.example.test/mara-voss.webp");
    expect(response.body.user.passwordHash).toBeUndefined();
  });

  it("clears the authenticated user's avatar URL", async () => {
    User.findByIdAndUpdate.mockResolvedValue(publicUser(""));

    const response = await request(app)
      .patch("/api/auth/profile")
      .set("Authorization", authHeader())
      .send({ avatarUrl: " " })
      .expect(200);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user-1",
      { $set: { avatarUrl: "" } },
      { new: true, runValidators: true }
    );
    expect(response.body.user.avatarUrl).toBe("");
  });

  it("rejects unsupported avatar URL formats", async () => {
    const response = await request(app)
      .patch("/api/auth/profile")
      .set("Authorization", authHeader())
      .send({ avatarUrl: "https://cdn.example.test/avatar.gif" })
      .expect(400);

    expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(response.body.error.code).toBe("INVALID_INPUT");
  });
});
