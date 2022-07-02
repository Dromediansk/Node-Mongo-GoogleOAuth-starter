"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNote = exports.createNote = exports.getNoteById = void 0;
const note_1 = __importDefault(require("../models/note"));
const getNoteById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params ? req.params.noteId : "";
        const note = yield note_1.default.findById(noteId);
        return note;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getNoteById = getNoteById;
const createNote = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = new note_1.default(req);
        const savedNote = yield note.save();
        return savedNote;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.createNote = createNote;
const editNote = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.params.noteProperties, { id } = _a, restNoteProperties = __rest(_a, ["id"]);
        yield note_1.default.findOneAndUpdate({ id }, Object.assign({}, restNoteProperties));
        const editedNote = yield note_1.default.findById(id);
        return editedNote;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.editNote = editNote;
const deleteNote = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params ? req.params.noteId : "";
        const note = yield note_1.default.findByIdAndRemove(noteId);
        return note;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=note.js.map