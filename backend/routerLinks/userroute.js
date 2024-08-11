const express = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const cors = require("cors");
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const referralCodeGenerator = require("referral-code-generator");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");
const { UserModel } = require("../model/usermodel");
const { uploadOnCloudinary } = require("../Cloudinary/Cloudinary");
const upload = multer({ dest: "uploads/" });

//   --------------- User Validation ------------->
const signupValidationRules = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("userName").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const UserRouter = express.Router();
UserRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

UserRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await UserModel.find({
      _id,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


UserRouter.patch("/avatar/:id", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const avatarSrc = await uploadOnCloudinary(avatarLocalPath);

    // Update user's avatar in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: avatarSrc.url || "" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Avatar updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


UserRouter.post("/signup",upload.single("avatar"), async (req, res) => {
  try {
    const {
      phonenumber,
      fullName,
      email,
      password
    } = req.body;

    // const avatarLocalPath = req.file?.path;
    //       console.log(avatarLocalPath)
    //       if (!avatarLocalPath) {
    //           throw new Error("Avatar URL is required");
    //       }
    
          const userPresent = await UserModel.findOne({ email });
          // const avatarsrc = await uploadOnCloudinary(avatarLocalPath);

    const user_present = await UserModel.findOne({
      email,
    });

    if (user_present) {
      res.status(409).send("Email Already Exist In Database");
    } else {
      bcrypt.hash(password, 4, async function (err, hash) {
        const new_user = await new UserModel({
          phonenumber,
          email,
          password: hash,
          fullName,
          // avatar:avatarsrc.url || "",
          referalCode: referralCodeGenerator.alpha("lowercase", 12),
        });
        await new_user.save();
        res.status(200).send({
          msg: "User Added Successfully",
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// ==================================== For Cloudinary Purpose ===================>


// <-------------- Login ------------>
// UserRouter.post("/login", async (req, res) => {
//   try {
//     const {email} = req.body
//     let user_present = await UserModel.findOne({
//       email,
//     });

//     if (req.body.gauth) {
//       console.log(req.body)
//       if (!user_present) {
//           const {fullName,profilePic} = req.body
//           user_present = await new UserModel({
//            fullName,
//             email,
//             avatar:profilePic,
//             referalCode: referralCodeGenerator.alpha("lowercase", 12),
//           });
//           await user_present.save();
//       }
//       res.status(201).send({
//         user: user_present,
//         msg: "Google Login Successfull"
//       });
//     } else {
//       if (!user_present) {
//         res.status(409).send("Email Does not exist!");
//       } else if (user_present) {
//         const hash_pass = await user_present.password;
//         const Result = bcrypt.compareSync(req.body.password, hash_pass); // true
//         if (!Result) {
//           res.status(410).send("Password Does not match");
//         } else {
//           res.status(200).send({
//             user: user_present,
//             msg: "Login successfull"
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });


UserRouter.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    let user_present = await UserModel.findOne({
      email,
    });

    if (req.body.gauth) {
      console.log(req.body);
      if (!user_present) {
        const { fullName, profilePic } = req.body;
        user_present = new UserModel({
          fullName,
          email,
          avatar: profilePic,
          referalCode: referralCodeGenerator.alpha("lowercase", 12),
        });
        await user_present.save();
      }

      const token = jwt.sign(
        { userId: user_present._id },
        process.env.SECRET_KEY,
      );

      console.log(token)
      res.status(201).send({
        user: user_present,
        token,
        msg: "Google Login Successful"
      });
    } else {
      if (!user_present) {
        res.status(409).send("Email Does not exist!");
      } else if (user_present) {
        const hash_pass = await user_present.password;
        const result = bcrypt.compareSync(req.body.password, hash_pass);

        if (!result) {
          res.status(410).send("Password Does not match");
        } else {
          const token = jwt.sign(
            { userId: user_present._id },
            process.env.SECRET_KEY,
          );

          res.status(200).send({
            user: user_present,
            token,
            msg: "Login successful"
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});



UserRouter.patch("/editUser/:id", async (req, res) => {
  try {
    const currUser = await UserModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.status(200).send({
      msg: "User Updated Successfully",
      user: currUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// <======= Change Password ============>

const saltRounds = 10; // increase salt rounds for stronger hashing

UserRouter.put("/changepassword/:id", async (req, res) => {
  const userId = req.params.id;
  const { currentPass, newPass } = req.body;
  console.log(currentPass, newPass, userId);
  try {
    if (!currentPass || !newPass) {
      return res
        .status(400)
        .json({ error: "Both current password and new password are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPass,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPass = await bcrypt.hash(newPass, saltRounds);
    user.password = hashedNewPass;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  UserRouter,
};
