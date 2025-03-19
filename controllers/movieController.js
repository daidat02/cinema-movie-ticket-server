import { createMovieService,getMovieService } from '../services/movieService.js';
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
export { createMovie,getMovies };