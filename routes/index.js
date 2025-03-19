import { Router } from "express";
import movieRoute from './movieRoute.js';
import cinemaRoute from './cinemaRoute.js';
import showtimeRoute from './showtimeRoute.js'
import roomRoute from './roomRoute.js'
import authRoute from './authRoute.js'
import paymentRoute from './paymentRoute.js'
import ticketRoute from './ticketRoute.js'
const router = Router();

router.use('/movie',movieRoute);
router.use('/cinema', cinemaRoute);
router.use('/showtime', showtimeRoute);
router.use('/room', roomRoute);
router.use('/auth', authRoute);
router.use('/payment', paymentRoute);
router.use('/ticket', ticketRoute);


export default router;