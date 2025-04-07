import DB_CONNECTION from "../model/DBConnection.js";
import { createShowtimeService, getDetailShowtimeService, getUpShowtimeByCinemaAndDateService, getUpShowtimeByMoiveAndDateService } from "../services/showtimeService.js";

const createShowtime = async (req, res) => {
    const { movieId, cinemaId, startTime, roomId } = req.body;
    try {
        const result = await createShowtimeService(movieId, cinemaId, startTime, roomId);

        return res.status(result.code).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const getUpShowtimeByMoiveAndDate = async (req, res) => {
    const { movieId, date } = req.params 
    try {
        const movie = await DB_CONNECTION.Movie.findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({
                message: 'không tìm thấy phim',
                success:false
            })
        }
        const result = await getUpShowtimeByMoiveAndDateService(movieId, date);
        return res.status(result.code).json(result);
    } catch (error) { 
        return res.status(500).json({ error: error.message });
    }
}

const getUpShowtimeByCinemaAndDate = async (req, res) => { 
    const { cinemaId, date } = req.params
    try {
        const cinema = await DB_CONNECTION.Cinema.findOne({ _id: cinemaId });
        if (!cinema) {
            return res.status(404).json({
                message: 'không tìm thấy rạp',
                success:false
            })
        }
        const result = await getUpShowtimeByCinemaAndDateService(cinemaId, date);
        return res.status(result.code).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
}
const getDetailShowtime = async (req, res) => {
    const{showtimeId}= req.params
    try {
        const result = await getDetailShowtimeService(showtimeId);
        return res.status(result.code).json(result);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export {
    createShowtime,
    getUpShowtimeByMoiveAndDate,
    getDetailShowtime,
    getUpShowtimeByCinemaAndDate
};