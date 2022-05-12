const mongoose = require("mongoose");
const validator = require("validator");
const autoIncrement = require("mongoose-auto-increment");

const connection = mongoose.createConnection("mongodb://localhost/myDatabase");

autoIncrement.initialize(connection);

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator(phone) {
          return validator.isMobilePhone(phone, "any");
        },
      },
    },
    first_name: {
      type: String,
      required: true,
      validate: {
        validator(firstname) {
          return validator.isAlphanumeric(firstname);
        },
      },
    },
    last_name: {
      type: String,
      required: true,
      validate: {
        validator(firstname) {
          return validator.isAlphanumeric(firstname);
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.plugin(autoIncrement.plugin, { model: "Lead", field: "id" });
leadSchema.index({ phone: 1, email: 1 }, { unique: true });

const model = mongoose.model("Lead", leadSchema);

module.exports = model;
