import { Schema,Types,model } from "mongoose";

const ObjectId = Types.ObjectId;

const ShowtimeSchema = new Schema({
    movie: {
        type: ObjectId,
        ref: 'Movie',
        required: true,
    },
    cinema: {
        type: ObjectId,
        ref: 'Cinema',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    room: {
        type: ObjectId,
        ref: 'Room',
    },
    isShown: {
        type: Boolean,
        default: false,
    },
    bookedSeats: [{
        type: ObjectId,
        ref: 'Seat',
    }]
});

const Showtime = model('Showtime', ShowtimeSchema);

export default Showtime;