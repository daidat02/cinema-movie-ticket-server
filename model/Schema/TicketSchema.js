import { model, Schema, Types } from "mongoose";
const ObjectId = Types.ObjectId

const TicketSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    showtime: {
        type: ObjectId,
        ref:"Showtime",
        required: true
    },
    seats: [
        { type: ObjectId, ref: 'Seat', required: true }
    ],
    totalPrice: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        enum: ["booked", "paid"],
        default:"booked"
    },
    bookedAt: { type: Date, default: Date.now }, // Ngày đặt vé
});

const Ticket = model('Ticket', TicketSchema);

export default Ticket;