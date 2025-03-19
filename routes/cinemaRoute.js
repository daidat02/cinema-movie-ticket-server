import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { createCinema } from "../controllers/cinemaController.js";

const router = Router();

router.post(API_PATH.CREATE_CINEMA, createCinema);

export default router;