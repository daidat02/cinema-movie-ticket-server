import DB_CONNECTION from "../model/DBConnection.js";
import { createRoomService, getDetailRoomService } from "../services/RoomService.js";

const createRoom = async (req, res) => {
    const {id,name,cinema,rowNumber,colNumber} = req.body 
    try {
        const result = await createRoomService(id,name,cinema,rowNumber,colNumber);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDetailRoom = async (req, res) => {
    const {roomId} = req.params 
    try {
        const result = await getDetailRoomService(roomId);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ error: error.name });
    }
}
export {
    createRoom,
    getDetailRoom
}