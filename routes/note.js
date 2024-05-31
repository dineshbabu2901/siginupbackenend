import { Router } from "express";
import mongoose, { Schema, now } from "mongoose";

const Note = mongoose.model("Note");
const app = Router();

app.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    console.log("akdsl;flkjfd", req.body, userId);
    const note = new Note({
      text,
      createdBy: userId,
    });
    console.log(note, "dflk;ads;kfl");
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.log("alkfdjal;jfd", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    console.log("kjsfalfa", req.body);
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.text = text;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await Note.findByIdAndUpdate(id, { $set: { restore: false } });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "kjfda;slkfd");
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    await Note.findByIdAndDelete(id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/trash/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await Note.findByIdAndUpdate(id, { $set: { restore: true } });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/trash", async (req, res) => {
  try {
    const { id } = req.user;
    const notes = await Note.find({ restore: true, createdBy: id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/:id?", async (req, res) => {
  const { id } = req.params;
  const { id: userID } = req.user;
  console.log(";lkdsfajk;lfds", req.user, userID);
  if (id) {
    const notes = await Note.findById(id);
    if (notes !== null) {
      return res.status(200).json(notes);
    } else {
      return res.status(404).send("not found");
    }
  } else {
    const notes = await Note.find({
      restore: false,
      createdBy: userID,
    });
    console.log(notes, ";aljdsfa;lkds");
    res.json(notes);
  }
});

export default app;
