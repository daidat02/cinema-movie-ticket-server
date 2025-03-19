import { Schema, Types, model } from "mongoose";

const CinemaSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

const Cinema = model('Cinema', CinemaSchema);

export default Cinema;