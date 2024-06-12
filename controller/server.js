const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("../model/schema");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const checkAuth = require("./checkAuth");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to the backend");
    app.listen(process.env.PORT, () => console.log("server has started"));
  })
  .catch((e) => console.log("Error has been detected:", e));

app.post("/", async (req, res) => {
  try {
    const { name, type, description,owner } = req.body;
    if (!name || !type || !description) {
      throw new Error("Some of the data are missing");
    }
    const addUserData = await Data.create({
      name: name,
      type: type,
      contents: description,
      owner:owner
    });
    return res.status(201).json({ message: "Data added successfully" });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Something went wrong" });
  }
});
app.get("/all", async (req, res) => {
  try {
    const id=req.query.id
    const getAll = await Data.find({owner:id});
    if (!getAll) {
      throw new Error("Unable to find the notes");
    }
    return res.status(200).json({ response: getAll });
  } catch (e) {
    return res
      .status(401)
      .json({ response: e.message || "Something went wrong" });
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;
    const deleteItem = await Data.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data removed successfully" });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Something went wrong" });
  }
});
app.put("/edit", async (req, res) => {
  try {
    const { id, name, type, description } = req.body;
    if (!id || !name || !type || !description) {
      throw new Error("Missing credentials");
    }
    const updateUser = await Data.findByIdAndUpdate(id, {
      name: name,
      type: type,
      contents: description,
    });
    return res
      .status(200)
      .json({ message: "Data updated successfully", dat: updateUser });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Data updated successfully" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("missing details ");
    }
    const exists=await User.findOne({email:email})
    if(exists){
      throw new Error("User already exists")
    }
    const hashed = await bcrypt.hash(password, 4);
    const createUser = await User.create({
      name: name,
      email: email,
      password: hashed,
    });
    return res.status(201).json({ message: "Account created successfully" });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Something went wrong" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("missing credentials");
    }
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("incorrect credentials");
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      throw new Error("Incorrect credentials");
    }
    const userId = findUser._id;
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ user: findUser, token: token });
    console.log(passwordMatch);
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Something went wrong" });
  }
});
app.get("/home", checkAuth, (req, res) => {

});
