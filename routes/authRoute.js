import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { loginAccount, registerAccount } from "../controllers/authController.js";

const router = Router();

router.post(API_PATH.REGISTER, registerAccount);
router.post(API_PATH.LOGIN, loginAccount);

export default router;