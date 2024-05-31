import { Router } from "express";
import mongoose, { Schema, now } from "mongoose";

const joinschema = mongoose.model("join");
const app = Router();

app.post("/join", async (req, res) => {
  console.log(req, "req");
  console.log(res, "res");
  try {
    const { email, street, village, fullAddress, age, location, phoneNumber } =
      req.body;

    // Create a new Contact document
    const Data = new joinschema({
      email,
      street,
      village,
      fullAddress,
      age,
      location,
      phoneNumber,
    });

    await Data.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});

export default app;
