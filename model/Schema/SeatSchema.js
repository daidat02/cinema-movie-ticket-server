import { model, Schema,Types } from "mongoose";
const ObjectId = Types.ObjectId
const SeatSchema = new Schema({
    seatNumber: {
        type: String,
        required: true
    },
    seatType: {
        type: String,
        enum: ["standard", "vip", "double"],
        default: "standard"
    },
    price: {
        type: Number,
        required:true
    },
    room: {
        type: ObjectId,
        ref: "Room",
        required: true
    }

});

const Seat = model("Seat", SeatSchema);

export default Seat;