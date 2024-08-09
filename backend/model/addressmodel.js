const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userarba",
      },
  addressItems: [
    {
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
      Landmark: {
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
      ActiveAddress: {
        type: String,
        required: true,
        default:false
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
        default:true
      },
    }
  ],
}, { timestamps: true });

const Address_model = mongoose.model("Address", addressSchema);

module.exports = {
    Address_model,
  };
