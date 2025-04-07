import { Router } from "express";
import { createShowtime, getDetailShowtime, getUpShowtimeByCinemaAndDate, getUpShowtimeByMoiveAndDate } from "../controllers/showtimecontroller.js";
import { API_PATH } from "../configs/constants.js";

const router = Router();

router.get(API_PATH.GET_SHOWTIMES_BY_MOVIE, getUpShowtimeByMoiveAndDate);
router.get(API_PATH.GET_SHOWTIMES_BY_CINEMA, getUpShowtimeByCinemaAndDate);

router.get(API_PATH.GET_DETAIL_SHOWTIME, getDetailShowtime)

router.post(API_PATH.CREATE_SHOWTIME, createShowtime);

export default router;