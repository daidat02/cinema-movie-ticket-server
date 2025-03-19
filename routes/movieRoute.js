import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { createMovie,getMovies } from "../controllers/movieController.js";

const router = Router();

router.post(API_PATH.CREATE_MOVIE,createMovie)
router.get(API_PATH.GET_MOVIE,getMovies)
export default router;