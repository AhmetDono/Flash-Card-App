const mongoose = require("mongoose");

const flashCardSchema = new mongoose.Schema(
  {
    cartName: {
      type: String,
      required: true,
    },
    QA: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    cat: [
      {
        catName: {
          type: String,
          default: "genereal",
        },
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required:true,
    },
    click: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("flashCard", flashCardSchema);
