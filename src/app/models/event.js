// to store data into mondoDB
import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    result: {
        type: Array
    },
    desc: {
        title: String,
        availableDates: [String],
        availableTimes: [String],
    }

        
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

