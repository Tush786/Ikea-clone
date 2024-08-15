const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  orderItems: [
    {
			product: {
				type: Object,
				required: true,
			},
			quantity: { type: Number,default:0 },
		},
  ],
});

const Cart_model = mongoose.model("cart", cartSchema);

module.exports = {
  Cart_model,
};
