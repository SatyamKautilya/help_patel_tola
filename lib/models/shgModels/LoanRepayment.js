import mongoose from "mongoose";

const LoanRepaymentSchema = new mongoose.Schema(
  {
    /* ---------------- CORE REFERENCES ---------------- */
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

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

    /* ---------------- AMOUNT ---------------- */
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    /* ---------------- BREAKDOWN ---------------- */
    principalComponent: {
      type: Number,
      default: 0,
      min: 0,
    },

    interestComponent: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ---------------- INTEREST AUDIT ---------------- */
    interestRateApplied: {
      type: Number, // monthly %
      min: 0,
    },

    interestRuleSource: {
      type: String,
      enum: ["DEFAULT", "OVERRIDE", "PERMANENT_CHANGE"],
      default: "DEFAULT",
    },

    /* ---------------- TIME CONTEXT ---------------- */
    month: {
      type: String, // YYYY-MM
      match: /^\d{4}-\d{2}$/,
      required: true,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    /* ---------------- AUDIT ---------------- */
    receivedBy: {
      type: String,
    },

    sandesh: {
      type: String, // याद रखने के लिए संदेश (optional memo)
      trim: true,
    },

    isReversed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- VALIDATIONS ---------------- */

// Ensure principal + interest === amount
LoanRepaymentSchema.pre("validate", function (next) {
  const total =
    (this.principalComponent || 0) +
    (this.interestComponent || 0);

  if (Number(total.toFixed(2)) !== Number(this.amount.toFixed(2))) {
    return next(
      new Error(
        "principalComponent + interestComponent must equal amount",
      ),
    );
  }

  if (this.principalComponent === 0 && this.interestComponent === 0) {
    return next(
      new Error(
        "At least one of principalComponent or interestComponent must be > 0",
      ),
    );
  }

  next();
});

/* ---------------- INDEXES ---------------- */

LoanRepaymentSchema.index({ loanId: 1 });
LoanRepaymentSchema.index({ memberId: 1 });
LoanRepaymentSchema.index({ shgId: 1, month: 1 });

// Optional: prevent duplicate repayment per loan per month (if business rule)
// Uncomment ONLY if multiple payments per month are NOT allowed
/*
LoanRepaymentSchema.index(
  { loanId: 1, month: 1 },
  {
    unique: true,
    partialFilterExpression: { isReversed: false },
  },
);
*/

/* ---------------- EXPORT ---------------- */

export default mongoose.models.LoanRepayment ||
  mongoose.model("LoanRepayment", LoanRepaymentSchema);
