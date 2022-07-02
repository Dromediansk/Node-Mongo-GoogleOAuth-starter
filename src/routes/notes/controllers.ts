import Note from "../../models/note";
import { Request, Response } from "express";
import { boomify } from "@hapi/boom";
import { Error } from "mongoose";
import dayjs from "dayjs";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();

    return res.json(notes);
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findById(noteId);

    return res.json(note);
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const publishedDate = dayjs().format("YYYY-MM");
    const note = new Note({ ...req.body, publishedDate });
    const createdNote = await note.save();

    return res.json(createdNote);
  } catch (err) {
    throw boomify(err as Error);
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
    throw boomify(err as Error);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params ? req.params.id : "";
    await Note.findByIdAndRemove(noteId);

    return res.json({ ok: true });
  } catch (err) {
    throw boomify(err as Error);
  }
};
