import { model, Schema, Types } from "mongoose";
const ObjectId = Types.ObjectId
const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    ticketsBooked: {
        type: Number,
        required: true,
        default: 0
    },
    totalReviews: {
        type: Number,
        required: true,
        default: 0
    },
    moviesWatched: {
        type: Number,
        required: true,
        default: 0
    },
    moviesFavourite: [{
        type: ObjectId,
        ref:'Movie'
    }]
});

const User = model('User', UserSchema);

export default User;