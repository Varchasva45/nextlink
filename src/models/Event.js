import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    type: String, 
    uri: String,
    page: String
}, {timestamps: true});


export default Event = models?.Event || model("Event", EventSchema);