const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        product: {
          productName: {
            type: String,
            required: true,
            trim: true,
          },

          itemcolor: {
            type: String,
            required: false,
          },

          sellingPrice: {
            type: Number,
            required: true,
          },

          retailPrice: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
          },
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        deliveredAt: {
          type: Date,
          default: function () {
            return new Date(this.orderDate.getTime() + 5 * 24 * 60 * 60 * 1000);
          },
        },
      },
    ],
    totalAmount: {
      type: String,
      required: false,
    },
    shippingAddress: {
      Name: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      PinCode: {
        type: String,
        required: true,
      },
      Locality: {
        type: String,
        required: true,
      },
      AddressType: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      },
      Landmark: {
        type: String,
        required: false,
      },
      AlternateNumber: {
        type: String,
        required: false,
      },
      MobileNumber: {
        type: String,
        required: false,
      },
      ActiveAddress: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
      required: false,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "PayPal", "Razorpay", "COD","UPI"],
    },
    transactionId: {
      type: String,
      required: function () {
        return this.paymentStatus === "Completed";
      },
    },
    refundStatus: {
      type: String,
      enum: ["Requested", "Processed", "Denied"],
      default: "Requested",
      required: false,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order_model = mongoose.model("Order", orderSchema);

module.exports = {
  Order_model,
};
