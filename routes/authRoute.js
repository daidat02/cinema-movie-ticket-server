import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { loginAccount, registerAccount,getDetailUser } from "../controllers/authController.js";
import { vertifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.get(API_PATH.GET_USER,vertifyToken, getDetailUser);
router.post(API_PATH.REGISTER, registerAccount);
router.post(API_PATH.LOGIN, loginAccount);

export default router;