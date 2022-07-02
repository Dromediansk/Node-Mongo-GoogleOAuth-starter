import { FastifyRequest } from "fastify";
import Note from "../models/note";

type EditNoteProperties = {
  id: string;
  title?: string;
  body?: string;
  keywords?: string[];
  category?: string;
};

export const getNoteById = async (
  req: FastifyRequest<{ Params: { noteId: string } }>
) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findById(noteId);

    return note;
  } catch (err) {
    console.log("err", err);
  }
};

export const createNote = async (req: FastifyRequest) => {
  try {
    const note = new Note(req);
    const savedNote = await note.save();

    return savedNote;
  } catch (err) {
    console.log("err", err);
  }
};

export const editNote = async (
  req: FastifyRequest<{ Params: { noteProperties: EditNoteProperties } }>
) => {
  try {
    const { id, ...restNoteProperties } = req.params.noteProperties;

    await Note.findOneAndUpdate({ id }, { ...restNoteProperties });
    const editedNote = await Note.findById(id);

    return editedNote;
  } catch (err) {
    console.log("err", err);
  }
};

export const deleteNote = async (
  req: FastifyRequest<{ Params: { noteId: string } }>
) => {
  try {
    const noteId = req.params ? req.params.noteId : "";
    const note = await Note.findByIdAndRemove(noteId);

    return note;
  } catch (err) {
    console.log("err", err);
  }
};
