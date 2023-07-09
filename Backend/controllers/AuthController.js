const User = require("../models/userModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log(token);
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {

    const {id} = req.params
    const username = req.body.name;
    const imagePath = req.file.path;
    const user = await User.findById(id)


    if (!user) {
      console.log("User not found");
      return;
    }
    user.imageUrl = imagePath || user.imageUrl
    user.username = username || user.username
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("Error editing user:", error);
  }

};

module.exports.deleteUser = async (req, res) => {
  console.log('delete cont')
  try {
    const userID = req.params.id;
    console.log(userID);
    const update = await User.findOneAndUpdate(
      { _id: userID },
      {
        isDeleted: true,
      }
    );

    if (update) {
      const allUsers = await User.find({ isDeleted: false });
      res.status(201).json(allUsers);
      console.log(allUsers);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update quote" });
    console.log(error.message);
  }
};


module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ isDeleted: false });
    console.log('delete cont')

    res.status(201).json(allUsers);
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    // console.log('delete cont')

    const user = await User.findOne({ _id: userID });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
};
