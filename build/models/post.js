"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const postSchema = new mongoose_1.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=post.js.map