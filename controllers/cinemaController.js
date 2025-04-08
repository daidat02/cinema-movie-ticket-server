import { createCinemaService, getCinemasService } from "../services/CinemaService.js";

const createCinema = async (req, res) => {
    const {id, name, location} = req.body;
    try {
        const result = await createCinemaService(id, name, location);
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCinemas = async (req, res) => { 
    try {
        const result = await getCinemasService();
        res.status(result.code).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export{createCinema,getCinemas};