const request = require("supertest");

jest.mock("../models/User", () => ({
  findById: jest.fn(),
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

describe("notification preferences route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns defaulted notification preferences", async () => {
    User.findById.mockResolvedValue({
      notificationPreferences: {
        productUpdates: true
      }
    });

    const response = await request(app)
      .get("/api/notification-preferences")
      .set("Authorization", authHeader())
      .expect(200);

    expect(User.findById).toHaveBeenCalledWith("user-1");
    expect(response.body.notificationPreferences).toEqual({
      securityAlerts: true,
      accountActivity: true,
      productUpdates: true,
      workflowSummary: true,
      marketing: false,
      digestFrequency: "weekly"
    });
  });

  it("updates editable preferences and keeps security alerts enabled", async () => {
    User.findByIdAndUpdate.mockResolvedValue({
      notificationPreferences: {
        securityAlerts: true,
        accountActivity: false,
        productUpdates: true,
        workflowSummary: true,
        marketing: false,
        digestFrequency: "daily"
      }
    });

    const response = await request(app)
      .patch("/api/notification-preferences")
      .set("Authorization", authHeader())
      .send({
        notificationPreferences: {
          securityAlerts: false,
          accountActivity: false,
          productUpdates: true,
          digestFrequency: "daily"
        }
      })
      .expect(200);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user-1",
      {
        $set: {
          "notificationPreferences.securityAlerts": true,
          "notificationPreferences.accountActivity": false,
          "notificationPreferences.productUpdates": true,
          "notificationPreferences.digestFrequency": "daily"
        }
      },
      { new: true, runValidators: true }
    );
    expect(response.body.notificationPreferences.securityAlerts).toBe(true);
    expect(response.body.notificationPreferences.digestFrequency).toBe("daily");
  });

  it("rejects invalid digest frequency", async () => {
    const response = await request(app)
      .patch("/api/notification-preferences")
      .set("Authorization", authHeader())
      .send({
        notificationPreferences: {
          digestFrequency: "hourly"
        }
      })
      .expect(400);

    expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(response.body.error.code).toBe("INVALID_INPUT");
  });
});
