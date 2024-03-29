import Note from "../../models/note";
import { Request, Response } from "express";
import dayjs from "dayjs";
import { NoteBodyType } from "../../globals/types/note";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();

    return res.json(notes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to get all notes!" });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findById(noteId);

    return res.json(note);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unable to get note!",
    });
  }
};

export const createNote = async (
  req: Request<{}, {}, NoteBodyType>,
  res: Response
) => {
  try {
    if (!req.body.title || !req.body.body) {
      return res.status(404).json({ message: "wrong input!" });
    }
    const publishedDate = dayjs().format("YYYY-MM");
    const note = new Note({ ...req.body, publishedDate });
    const createdNote = await note.save();

    return res.json(createdNote);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to create note!" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = req.body;
    const { ...updateData } = note;
    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.json(updatedNote);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update note!" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params ? req.params.id : "";
    await Note.findByIdAndRemove(noteId);

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete note!" });
  }
};
