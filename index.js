import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 9005;

/**
 * schema import
 */
import "./models/sign.js";
import "./models/join.js";
import "./models/note.js";
import auth from "./jwt.js";

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
passport.use(auth);

/**
 * mongodb connection
 */
const mongodbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/light", {});
    console.log("mongodb connected");
  } catch (error) {
    return console.log("error", error);
  }
};

/**
 * routes import
 */

import sign from "./routes/sign.js";
import join from "./routes/join.js";
import note from "./routes/note.js";

/**
 * routes call
 */

app.use("/post", sign);
app.use("/join", join);
app.use("/note", passport.authenticate("jwt", { session: false }), note);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongodbConnection();
});
