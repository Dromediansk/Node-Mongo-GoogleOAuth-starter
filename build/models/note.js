"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const noteSchema = new mongoose_1.Schema({
    id: { type: ObjectId },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    keywords: {
        tags: [{ type: String, required: true }],
    },
    category: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
});
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
//# sourceMappingURL=note.js.map