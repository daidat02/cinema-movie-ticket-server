import { Types } from "mongoose";
import DB_CONNECTION from "../model/DBConnection.js"
const ObjectId = Types.ObjectId
const getTicketByUserIdService = async (userId) => {
    const now = new Date(); // Lấy thời gian hiện tại

    const tickets = await DB_CONNECTION.Ticket.find({ user: new ObjectId(userId), status:'paid' }).populate([
        {
            path: "showtime",
            match: { startTime: { $gt: now } }, // Chỉ lấy suất chiếu chưa bắt đầu

            select: "-bookedSeats",
            populate: [
                { path: "movie" }, 
                { path: "cinema", select: "name" }, 
                { path: "room", select: "name" }
            ]
        },
        {path:"seats" , select: "seatNumber"}
    ]);
        // Loại bỏ vé không có suất chiếu hợp lệ (do `match` không loại bỏ trực tiếp trong find)
        const filteredTickets = tickets.filter(ticket => ticket.showtime !== null);

    return {
        data: filteredTickets,
        success: true,
        message: 'lấy dữ liệu thành công',
        code:200
    }
}
const getDetailTicketService = async (ticketId) => { 
    const ticket = await DB_CONNECTION.Ticket.findById(new ObjectId(ticketId)).populate([
        {path : 'user'},
        {   
            path: "showtime",
            populate: [
                { path: "movie" }, 
                { path: "cinema", select: "name" }, 
                { path: "room", select: "name" }
            ]
        },
        {path:"seats" , select: "seatNumber"}
    ]);

    return {
        data: ticket,
        success: true,
        message: 'lấy dữ liệu thành công',
        code:200
    }
}

export {
    getTicketByUserIdService,
    getDetailTicketService
}