import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { bookTicketMovie,createPaymentUrlVNPay, vnPayRetrun } from "../controllers/paymentController.js";
import { vertifyToken } from "../middlewares/authMiddleware.js";
const router = Router();

router.post(API_PATH.BOOK_TICKET,vertifyToken,bookTicketMovie)
router.get(API_PATH.CREATE_URL_VNP, vertifyToken, createPaymentUrlVNPay);
router.get(API_PATH.VNP_RETURN,vnPayRetrun);
export default router;