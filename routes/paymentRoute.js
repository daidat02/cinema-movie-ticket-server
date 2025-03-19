import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { bookTicketMovie } from "../controllers/paymentController.js";
import { vertifyToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post(API_PATH.BOOK_TICKET,vertifyToken,bookTicketMovie)

export default router;