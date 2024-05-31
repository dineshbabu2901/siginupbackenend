import { Router } from "express";
import mongoose, { Schema, now } from "mongoose";
import jwt from "jsonwebtoken";

const signModel = mongoose.model("sign");
const app = Router();

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(password, user.password);
    if (String(password) !== String(user.password)) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "Random string", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Signin successful",
      user: { email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log("lasfj;da", req.body);

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    //const hashedPassword = hashSync(password, 10);
    const newUser = new signModel({
      email,
      password,
      confirmPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
