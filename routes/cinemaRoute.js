import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { createCinema, getCinemas } from "../controllers/cinemaController.js";

const router = Router();
router.get(API_PATH.GET_CINEMAS, getCinemas);
router.post(API_PATH.CREATE_CINEMA, createCinema);
export default router;