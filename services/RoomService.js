import { Types } from "mongoose";
import DB_CONNECTION from "../model/DBConnection.js";
const ObjectId= Types.ObjectId
const createRoomService = async (id,name,cinema,rowNumber,colNumber) => {

    const newRoom = new DB_CONNECTION.Room({
        id:id,
        name:name,
        cinema: new ObjectId(cinema),
        rowNumber: rowNumber,
        colNumber: colNumber
    });

    const savedRoom = await newRoom.save();

    const rows = Array.from({length:rowNumber},(v,i)=> String.fromCharCode(65+i));
    const cols = colNumber;

    const seats = [];
    for (let row of rows) {
        for (let col = 1; col <= cols; col++) {
            const seat = new DB_CONNECTION.Seat({
                seatNumber: `${row}${col}`,
                price: 100000,
                room: new ObjectId(savedRoom._id),
            });
            seats.push(seat)
        };
    };
    const savedSeats = await DB_CONNECTION.Seat.insertMany(seats);
    const seatIds = savedSeats.map((seat) => seat._id);

  // Cập nhật danh sách ghế vào Room
  await DB_CONNECTION.Room.findByIdAndUpdate(new ObjectId(savedRoom._id), { $push: { seats: { $each: seatIds } } })
    return {
        success: true,
        message: 'tạo phòng thành công',
        seats: seats,
        code:201
    }
};

const getDetailRoomService = async (roomId) => {
    const room = await DB_CONNECTION.Room.findById(roomId).populate('seats');
    return {
        message: 'lấy thông tin thành công',
        success: true,
        data: room,
        code:200
    }
}

export {
    createRoomService,
    getDetailRoomService
}