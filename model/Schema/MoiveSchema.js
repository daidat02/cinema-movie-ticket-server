import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    ,
    director: {
        type: String,
        required: true,
    },
    actor: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    
});

const Movie = model('Movie', MovieSchema);

export default Movie;