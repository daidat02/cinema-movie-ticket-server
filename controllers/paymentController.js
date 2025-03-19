import { generateID } from "../configs/constants.js";
import { bookTicketMovieService } from "../services/paymentService.js";

const bookTicketMovie = async (req, res) => {
    const { showtimeId, seats } = req.body
  try {
    const id = generateID(10);
    const user = req.user;
    console.log('user:',user)

      const result = await bookTicketMovieService(id, user, showtimeId, seats);

      res.status(result.code).json(result);
    } catch (error) {
    res.status(500).json({ message: error.message });
  }  
};

export { bookTicketMovie };