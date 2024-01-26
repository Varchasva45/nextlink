import { Schema, models, model } from "mongoose";

const PageSchema = new Schema({
    uri: {
        type: String,
        required: true,
        unique: true,
        min: 1
    },
    owner: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Page = models?.Page || model('Page', PageSchema);