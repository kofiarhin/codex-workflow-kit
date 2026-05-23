const { asyncHandler } = require("../middleware/asyncHandler");
const BraidService = require("../models/BraidService");
const { AppError } = require("../utils/AppError");

const writableFields = [
  "name",
  "description",
  "durationMinutes",
  "priceDollars",
  "isActive"
];

function normalizeServicePayload(payload, { partial = false } = {}) {
  const updates = {};

  for (const field of writableFields) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      updates[field] = payload[field];
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(updates, "name")) {
    if (typeof updates.name !== "string" || !updates.name.trim()) {
      throw new AppError("Service name is required", 400, "INVALID_INPUT");
    }
    updates.name = updates.name.trim();
  }

  if (!partial || Object.prototype.hasOwnProperty.call(updates, "description")) {
    if (typeof updates.description !== "string" || !updates.description.trim()) {
      throw new AppError("Service description is required", 400, "INVALID_INPUT");
    }
    updates.description = updates.description.trim();
  }

  if (!partial || Object.prototype.hasOwnProperty.call(updates, "durationMinutes")) {
    if (!Number.isFinite(updates.durationMinutes) || updates.durationMinutes < 15) {
      throw new AppError("Duration must be at least 15 minutes", 400, "INVALID_INPUT");
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(updates, "priceDollars")) {
    if (!Number.isFinite(updates.priceDollars) || updates.priceDollars < 0) {
      throw new AppError("Price must be zero or greater", 400, "INVALID_INPUT");
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(updates, "isActive") &&
    typeof updates.isActive !== "boolean"
  ) {
    throw new AppError("Active status must be a boolean", 400, "INVALID_INPUT");
  }

  if (partial && Object.keys(updates).length === 0) {
    throw new AppError("At least one service field is required", 400, "INVALID_INPUT");
  }

  return updates;
}

const listBraidServices = asyncHandler(async (req, res) => {
  const services = await BraidService.find({}).sort({ name: 1 });
  res.json({
    braidServices: services.map((service) => service.toPublicJSON())
  });
});

const createBraidService = asyncHandler(async (req, res) => {
  const payload = normalizeServicePayload(req.body);
  const service = await BraidService.create(payload);
  res.status(201).json({ braidService: service.toPublicJSON() });
});

const updateBraidService = asyncHandler(async (req, res) => {
  const payload = normalizeServicePayload(req.body, { partial: true });
  const service = await BraidService.findByIdAndUpdate(
    req.params.id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!service) {
    throw new AppError("Braid service not found", 404, "BRAID_SERVICE_NOT_FOUND");
  }

  res.json({ braidService: service.toPublicJSON() });
});

const deleteBraidService = asyncHandler(async (req, res) => {
  const service = await BraidService.findByIdAndDelete(req.params.id);

  if (!service) {
    throw new AppError("Braid service not found", 404, "BRAID_SERVICE_NOT_FOUND");
  }

  res.json({ ok: true });
});

module.exports = {
  createBraidService,
  deleteBraidService,
  listBraidServices,
  updateBraidService
};
