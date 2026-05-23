describe("optional MongoDB configuration", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it("does not require MONGODB_URI for local smoke configuration", () => {
    jest.resetModules();
    process.env.NODE_ENV = "development";
    process.env.CLIENT_ORIGIN = "http://localhost:5175";
    process.env.JWT_SECRET = "test-secret-with-enough-length";
    delete process.env.MONGODB_URI;

    expect(() => require("../config/env")).not.toThrow();
    expect(require("../config/env").mongoUri).toBeUndefined();
  });

  it("skips the mongoose connection when MONGODB_URI is absent", async () => {
    const connect = jest.fn();
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.doMock("mongoose", () => ({
      set: jest.fn(),
      connect,
      connection: { readyState: 0 }
    }));

    jest.resetModules();
    process.env.NODE_ENV = "development";
    process.env.CLIENT_ORIGIN = "http://localhost:5175";
    process.env.JWT_SECRET = "test-secret-with-enough-length";
    delete process.env.MONGODB_URI;

    const { connectDb } = require("../config/db");

    await expect(connectDb()).resolves.toBeNull();
    expect(connect).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(
      "MONGODB_URI is not set. Skipping MongoDB connection for local smoke mode."
    );
  });
});
