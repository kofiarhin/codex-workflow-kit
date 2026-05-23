const mongoose = require("mongoose");

const braidServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 15,
      max: 720
    },
    priceDollars: {
      type: Number,
      required: true,
      min: 0,
      max: 5000
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

braidServiceSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    durationMinutes: this.durationMinutes,
    priceDollars: this.priceDollars,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model("BraidService", braidServiceSchema);
