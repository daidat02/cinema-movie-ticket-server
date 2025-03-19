import { Router } from "express";
import { API_PATH } from "../configs/constants.js";
import { createRoom, getDetailRoom } from "../controllers/roomController.js";

const router = Router();

router.post(API_PATH.CREATE_ROOM,createRoom)
router.get(API_PATH.GET_DETAIL_ROOM, getDetailRoom)

export default router;