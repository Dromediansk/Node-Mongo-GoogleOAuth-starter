import Note from "../../models/note";
import { Request } from "express";
import { boomify } from "@hapi/boom";
import { Error } from "mongoose";

export const getAllNotes = async () => {
  try {
    const notes = await Note.find();
    return notes;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const getNoteById = async (req: Request) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findById(noteId);

    return note;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const createNote = async (req: Request) => {
  try {
    const note = new Note(req);
    const savedNote = await note.save();

    return savedNote;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const updateNote = async (req: Request) => {
  try {
    const { noteId } = req.params;
    const note = req.body;
    const { ...updateData } = note;
    const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, {
      new: true,
    });

    return updatedNote;
  } catch (err) {
    throw boomify(err as Error);
  }
};

export const deleteNote = async (req: Request) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findByIdAndRemove(noteId);

    return note;
  } catch (err) {
    throw boomify(err as Error);
  }
};
