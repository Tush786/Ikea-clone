const express = require("express");
const { Address_model } = require("../model/addressmodel");

require("dotenv").config();
const Addressroute = express.Router();

Addressroute.get("/get/:owner", async (req, res) => {
  const {owner}=req.params
  console.log(owner)
  try {
    const data = await Address_model.find({owner});
    console.log(data)
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
    console.log(owner)
    console.log(addressItems);
  
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
Addressroute.put("/activeAddress/:owner/:addressId", async (req, res) => {
  const { owner, addressId } = req.params;
   console.log(owner,addressId)
  try {
    await Address_model.updateMany(
      { owner: owner },
      { $set: { "addressItems.$[].ActiveAddress": false } }
    );

    // Then, set the specific address to active
    const updatedDocument = await Address_model.findOneAndUpdate(
      { owner: owner, "addressItems._id": addressId },
      { $set: { "addressItems.$.ActiveAddress": true } },
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


// Edit Address Route
Addressroute.put("/edit/:owner/:addressId", async (req, res) => {
  const { owner, addressId } = req.params;
  let { updatedAddressItem } = req.body;

  try {
    // Retrieve the existing address document to get the current ActiveAddress status
    const addressDocument = await Address_model.findOne(
      { owner: owner, "addressItems._id": addressId },
      { "addressItems.$": 1 } // Select only the relevant address item
    );

    if (!addressDocument || addressDocument.addressItems.length === 0) {
      return res.status(404).send({
        status: false,
        type: "NOT_FOUND",
        error: "Address not found for the specified owner or address item.",
      });
    }

    // Preserve the existing ActiveAddress status
    const currentActiveStatus = addressDocument.addressItems[0].ActiveAddress;
    updatedAddressItem.ActiveAddress = currentActiveStatus;

    // Update the specific address item without changing the ActiveAddress field
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
Addressroute.delete("/delete/:owner/:addressId", async (req, res) => {
  const { owner, addressId } = req.params;

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
