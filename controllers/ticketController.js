import { getTicketByUserIdService } from "../services/ticketService.js";

const getTicketByUserId = async (req, res) => {
    try {
        const user = req.user
        console.log(user);
        const result = await getTicketByUserIdService(user._id);

        return res.status(result.code).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}


export {
    getTicketByUserId
}