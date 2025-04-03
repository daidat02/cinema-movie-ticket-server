import { createMovieService,getMovieService, getMoviesFavouriteService, updateMovieFavouriteService } from '../services/movieService.js';
const createMovie = async (req, res) => { 
    const { id,title, genre, duration, releaseDate, director,description, actor, imageUrl } = req.body;
    try {
        const result = await createMovieService(id, title, genre, duration, releaseDate, director, description, actor, imageUrl);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMovies = async (req, res) => { 
    try {
        const result = await getMovieService();
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMovieFavourite = async (req, res) => {
    const { movieId } = req.params
    const user = req.user
    try {
        const result = await updateMovieFavouriteService(user._id, movieId);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMoviesFavourite = async (req, res) => {
    const user= req.user
    try {
        const result = await getMoviesFavouriteService(user._id);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createMovie,getMovies,updateMovieFavourite ,getMoviesFavourite};