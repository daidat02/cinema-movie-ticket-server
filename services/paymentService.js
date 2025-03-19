import { Types } from "mongoose";
import DB_CONNECTION from "../model/DBConnection.js";
const ObjectId = Types.ObjectId
const bookTicketMovieService = async (id,user,showtimeId, seats) => {
    const showtime = await DB_CONNECTION.Showtime.findById(showtimeId)
        .populate({
            path: "room",
            populate: {
                path: "seats"
            }
        });
        console.log('user:',user)
    if (!showtime) {
        return {
            success: false,
            code: 404,
            message: 'không tìm thấy xuất chiếu'
        }
    };
    
    if (showtime.startTime <= Date.now()) {
        return {
            success: false,
            code: 404,
            message: 'Đã qua xuất chiếu'
        }
    };

    // danh sách ghế đã được đặt trong xuất chiếu
    const bookedSeats = showtime.bookedSeats.map(seat => seat.toString());
    //kiểm tra ghế đã được đặt chưa
    const alreadyBookedSeats = seats.filter(seat => bookedSeats.includes(seat));
    if (alreadyBookedSeats.length > 0) {
        return {
            success: false,
            code: 400,
            message: `Các ghế sau đã được đặt: ${alreadyBookedSeats.join(', ')}`
        };
    }

    const selectedSeats = showtime.room.seats.filter(seat => seats.includes(seat._id.toString()));

    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    const newTicket = new DB_CONNECTION.Ticket({
        id:id,
        showtime: showtimeId,
        seats: seats,
        totalPrice: totalPrice,
        user:new ObjectId(user._id)
    });

    showtime.bookedSeats.push(...seats);
    await showtime.save();


    await newTicket.save();
    return {
        success: true,
        code: 200,
        message: 'Đặt vé thành công',
        ticket: newTicket
    };
};

export { bookTicketMovieService };