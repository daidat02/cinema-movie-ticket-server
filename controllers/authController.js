import { Types } from "mongoose";
import { generateID } from "../configs/constants.js";
import DB_CONNECTION from "../model/DBConnection.js";
import { loginAccountService, registerAccountService } from "../services/authService.js";
const ObjectId = Types.ObjectId;
const registerAccount = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        const id = generateID(10);
        const result = await registerAccountService(id, name, email, phoneNumber, password);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginAccount = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const result = await loginAccountService(phoneNumber, password );
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDetailUser = async (req, res) => { 
    const user = req.user;
    try {
        const result = await DB_CONNECTION.User.findById(new ObjectId(user._id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { registerAccount, loginAccount, getDetailUser };  