import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { getTicketByUserId } from "../controllers/ticketController.js";
import { vertifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(API_PATH.GET_TICKETS,vertifyToken, getTicketByUserId)
export default router;