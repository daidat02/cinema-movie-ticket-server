import { generateID } from "../configs/constants.js";
import { bookTicketMovieService, createPaymentUrlVNPayService, vnPayRetrunService } from "../services/paymentService.js";

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

const createPaymentUrlVNPay =  async(req, res) => { 
  const { ticketId } = req.query;
  const ip =req.ip;
  try {
    const result = await createPaymentUrlVNPayService(ticketId,ip);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const vnPayRetrun = async (req, res) => { 
  const vnp_Params = req.query;
  try {
    const result = await vnPayRetrunService(vnp_Params);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

export { bookTicketMovie ,createPaymentUrlVNPay , vnPayRetrun};