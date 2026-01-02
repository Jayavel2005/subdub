import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      default: function () {
        const renewalPeriods = {
          daily: 1,
          weekly: 7,
          monthly: 31,
          yearly: 365,
        };
        const period =
          renewalPeriods[this.frequency] || renewalPeriods["monthly"];
        if (!this.startDate) return undefined;
        const rd = new Date(this.startDate);
        rd.setDate(rd.getDate() + period);
        return rd;
      },
      validate: {
        validator: function (value) {
          // If startDate is missing, other validators will handle it; only validate when both present
          if (!this.startDate || !value) return true;
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date.",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  // Set status to expired if renewalDate is already in the past
  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
