import { Types } from 'mongoose';
import DB_CONNECTION  from '../model/DBConnection.js';
const ObjectId = Types.ObjectId
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

const updateMovieFavouriteService = async (userId, movieId) => {
    const user = await DB_CONNECTION.User.findById(new ObjectId(userId));

    const movieFavoriteExisted = user.moviesFavourite.some(id => id.equals(new ObjectId(movieId)));

    if (movieFavoriteExisted) {
        user.moviesFavourite.pop(movieId);
        await user.save();
        return {
            success: true,
            message: "Cập nhật danh sách yêu thích thành công",
            code: 200,
            data: user.moviesFavourite
        }
    } else {
        user.moviesFavourite.push(movieId);
        await user.save();
        return {
            success: true,
            message: "Đã Thêm Vào Danh Sách Yêu Thích",
            code: 200,
            data: user.moviesFavourite
        }
    }
}



const getMoviesFavouriteService = async (userId) => {
    try {
        const user = await DB_CONNECTION.User.findById(new ObjectId(userId)).populate("moviesFavourite");
        return {
            code: 200,
            success: true,
            message: "Lấy danh sách phim yêu thích thành công",
            data: user.moviesFavourite
        };
    } catch (error) {
        return {
            code: 500,
            success: false,
            message: "Lỗi máy chủ: " + error.message,
            data: []
        };
    }
};

export{ createMovieService,getMovieService,updateMovieFavouriteService, getMoviesFavouriteService};