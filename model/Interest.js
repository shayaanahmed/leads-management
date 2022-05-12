const mongoose = require("mongoose");
const validator = require("validator");

const interestSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      validate: {
        validator(message) {
          return validator.isAlphanumeric(message);
        },
      },
    },
    lead_id: {
      type: Number,
      ref: "Lead",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Interest", interestSchema);

module.exports = model;
