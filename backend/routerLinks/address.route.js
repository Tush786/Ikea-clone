const express = require("express");
const { Address_model } = require("../model/addressmodel");

require("dotenv").config();
const Addressroute = express.Router();

Addressroute.get("/get", async (req, res) => {
  const {owner}=req.body
  // console.log(owner,"line no 9")
  try {
    const data = await Address_model.find({owner});
    // console.log(data)
    if (data) {
      return res.status(200).send({ message: "User addresses retrieved successfully", data });
    } else {
      return res.status(404).send({ message: "No addresses found" });
    }
  } catch (error) {
    console.error("Error retrieving addresses:", error.message);
    return res.status(500).send({ error: "Internal server error" });
  }
});


Addressroute.post("/add", async (req, res) => {
    const { owner, addressItems } = req.body;
    // Validate required fields
    if (!owner || !addressItems || !Array.isArray(addressItems) || addressItems.length === 0) {
      return res.status(400).send({
        status: false,
        type: "INVALID_REQUEST",
        error: "Owner and addressItems are required and addressItems should be a non-empty array.",
      });
    }
  
    try {
      // Check if the owner already exists
      const existingAddress = await Address_model.findOne({ owner });
  
      if (existingAddress) {
        // Owner exists, update the addressItems array
        existingAddress.addressItems.forEach(item => item.ActiveAddress = false);

        existingAddress.addressItems.push(...addressItems);
        await existingAddress.save();
        return res.status(200).send({ status: true, address: existingAddress });
      } else {
        // Owner does not exist, create a new address document
        const newAddress = new Address_model({
          owner,
          addressItems,
        });
        await newAddress.save();
        return res.status(200).send({ status: true, address: newAddress });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        type: "SERVER_ERROR",
        error: error.message,
      });
    }
  });

// Edit Activeaddress route
Addressroute.put("/activeAddress/:addressId", async (req, res) => {
  const { addressId } = req.params;
  const {status, owner} = req.body;
   console.log("line no 69",owner,addressId)
  try {
    await Address_model.updateMany(
      { owner: owner },
      { $set: { "addressItems.$[].ActiveAddress": false } }
    );

    const updatedDocument = await Address_model.findOneAndUpdate(
      { owner: owner, "addressItems._id": addressId },
      { $set: { "addressItems.$.ActiveAddress": status } },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Address not found for the specified owner or address item.",
      });
    }

    return res.status(200).send({ status: true, address: updatedDocument });
  } catch (error) {
    return res.status(500).send({
      status: false,
      type: "SERVER_ERROR",
      error: error.message,
    });
  }
});


Addressroute.put("/edit/:addressId", async (req, res) => {
  const { addressId } = req.params;
  const { owner } = req.body;
  const updatedAddressItem={
       Name: req.body.Name,
       City:req.body.City,
        State:req.body. State,
       PinCode:req.body.PinCode,
       Locality:req.body.Locality,
       Landmark:req.body.Landmark,
        AddressType:req.body. AddressType,
        Address:req.body. Address,
       ActiveAddress:req.body.ActiveAddress,
       ActiveAddress:req.body.ActiveAddress,
       MobileNumber:req.body.MobileNumber,
  }
  console.log(updatedAddressItem)
  try {
    const addressDocument = await Address_model.findOne(
      { owner: owner, "addressItems._id": addressId },
      { "addressItems.$": 1 } 
    );

    if (!addressDocument || addressDocument.addressItems.length === 0) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Address not found for the specified owner or address item.",
      });
    }

    const currentActiveStatus = addressDocument.addressItems[0].ActiveAddress;
    updatedAddressItem.ActiveAddress = currentActiveStatus;

    const updatedDocument = await Address_model.findOneAndUpdate(
      { owner: owner, "addressItems._id": addressId },
      {
        $set: {
          "addressItems.$": updatedAddressItem
        }
      },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Address not found for the specified owner or address item.",
      });
    }

    return res.status(200).send({ status: true, address: updatedDocument });
  } catch (error) {
    return res.status(500).send({
      status: false,
      type: "SERVER_ERROR",
      error: error.message,
    });
  }
});


// Delete Address from Database
Addressroute.delete("/delete/:addressId", async (req, res) => {
  const {  addressId } = req.params;
  const { owner} = req.body;
  try {
    const addressDocument = await Address_model.findOneAndUpdate(
      { owner: owner },
      {
        $pull: {
          addressItems: { _id: addressId }
        }
      },
      { new: true }
    );

    if (!addressDocument) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Address not found for the specified owner or address item.",
      });
    }

    return res.status(200).send({ status: true, address: addressDocument });
  } catch (error) {
    return res.status(500).send({
      status: false,
      type: "SERVER_ERROR",
      error: error.message,
    });
  }
});

module.exports = {
  Addressroute,
};
