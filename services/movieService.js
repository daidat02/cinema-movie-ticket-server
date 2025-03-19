import DB_CONNECTION  from '../model/DBConnection.js';

const createMovieService = async(id,title, genre, duration, releaseDate, director,description, actor, imageUrl)=> {
    try {
        const newMovie = new DB_CONNECTION.Movie({
            id,
            title,
            genre,
            duration,
            description,
            releaseDate,
            director,
            actor,
            imageUrl,
        });
        await newMovie.save();
        return {
            message: 'Thêm phim mới thành công',
            data: newMovie,
            success: true,
            code:201,
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            code: 500,
        }
    }
}

const getMovieService = async () => { 
    try {
        
        const movies = await DB_CONNECTION.Movie.find();
        return {
            message: 'lấy danh sách phim thành công',
            data: movies,
            success: true,
            code:200,
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            code: 500,
        } 
    }
}

export{ createMovieService,getMovieService};