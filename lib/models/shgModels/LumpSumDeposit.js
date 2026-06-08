import mongoose from "mongoose";

const LumpSumDepositSchema = new mongoose.Schema(
  {
    shgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shg",
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShgMember",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    purpose: {
      type: String, // optional note
      trim: true,
    },

    sandesh: {
      type: String, // याद रखने के लिए संदेश (optional memo)
      trim: true,
    },

    receivedBy: {
      type: String,
      default: "SYSTEM",
    },

    isReversed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

LumpSumDepositSchema.index({ shgId: 1 });
LumpSumDepositSchema.index({ memberId: 1 });

export default mongoose.models.LumpSumDeposit ||
  mongoose.model("LumpSumDeposit", LumpSumDepositSchema);
