import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { updateMovieFavourite, createMovie,getMovies, getMoviesFavourite } from "../controllers/movieController.js";
import { vertifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.get(API_PATH.GET_MOVIE, getMovies)

router.get(API_PATH.GET_MOVIES_FAVOURITE, vertifyToken, getMoviesFavourite)

router.post(API_PATH.CREATE_MOVIE,createMovie)
router.post(API_PATH.UPDATE_MOVIE_FAVOURITE, vertifyToken, updateMovieFavourite)

export default router;