import { Schema, Types, model } from "mongoose";
const ObjectId = Types.ObjectId;
const RoomSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    cinema: {
        type: ObjectId,
        ref:"Cinema",
        required: true,
    },
    rowNumber: {
        type: Number,
        required: true
    },
    colNumber: {
        type: Number,
        required: true
    },
    seats: [{
        type: ObjectId,
        ref:"Seat"
    }]
});

const Room = model('Room', RoomSchema);
export default Room;