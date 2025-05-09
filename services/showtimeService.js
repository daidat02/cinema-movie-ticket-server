import { Types } from "mongoose";
import DB_CONNECTION from "../model/DBConnection.js";
const ObjectId = Types.ObjectId
const createShowtimeService = async (movieId, cinemaId, startTime, roomId, ticketPrice) => {
    try {
        const room = await DB_CONNECTION.Room.findById(new ObjectId(roomId));
        if (!room) {
            return { code: 404, message: "Room not found" };
        }

        const newShowtime = new DB_CONNECTION.Showtime({
            movie: movieId,
            cinema: cinemaId,
            startTime,
            room: roomId,
            ticketPrice,
            seatNumbers: room.seats.length,
        });
        await newShowtime.save();
        return { code: 200, message: "Showtime created successfully", showtime: newShowtime };
    } catch (error) {
        return { code: 500, message: error.message };
    }
};

const getUpShowtimeByMoiveAndDateService = async (movieId, date) => {
    try {
        if (!movieId) {
            return { code: 400, message: "Movie ID is required" };
        }
        const MovieObjectId = new ObjectId(movieId);

        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const now = new Date();
        if (startOfDay <= now && now <= endOfDay) {
            startOfDay = now;
        }
        const showtimes = await DB_CONNECTION.Showtime.aggregate([
            {
                $match: {
                    movie: MovieObjectId,
                    startTime: {
                        $gte: startOfDay,  
                        $lte: endOfDay
                    }
                },
            },
            {
                $sort:{startTime:1}
            },
            {
                $lookup: {
                    from: "cinemas",
                    localField: "cinema",
                    foreignField: "_id",
                    as: "cinema"
                }
            },
            { $unwind: "$cinema" },
            {
                $addFields: {
                    availableSeats: {
                        $subtract: ["$seatNumbers", { $size: "$bookedSeats" }]
                    }
                }
            },
            {
                $group: {
                    _id: "$cinema._id",
                    cinemaName: { $first: "$cinema.name" },
                    showtimes: {
                        $push: {
                            _id: "$_id",
                            startTime: "$startTime",
                            seatNumbers: "$seatNumbers",
                            availableSeats: "$availableSeats"
                        }
                    }
                }
            }
        ]);

        return {
            success:true,
            data: showtimes,
            code:200
        };
   } catch (error) {
        return { code: 500, message: error.message };
   }
}

const getUpShowtimeByCinemaAndDateService = async (cinemaId, date) => { 

    let startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    let endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const now = new Date();
    if (startOfDay <= now && now <= endOfDay) {
        startOfDay = now;
    }
    const showtimes = await DB_CONNECTION.Showtime.aggregate([
        {
            $match: {
                cinema: new ObjectId(cinemaId),
                startTime: {
                    $gte: startOfDay,  
                    $lte: endOfDay
                }
            },
        },
        {
            $sort:{startTime:1}
        },
        {
            $lookup: {
                from: "movies",
                localField: "movie",
                foreignField: "_id",
                as: "movie"
            }
        },
        { $unwind: "$movie" },
        {
            $addFields: {
                availableSeats: {
                    $subtract: ["$seatNumbers", { $size: "$bookedSeats" }]
                }
            }
        },
        {
            $group: {
                _id: "$movie._id",
                movieName: { $first: "$movie.title" },
                movieImage: { $first: "$movie.imageUrl" },
                movieDuration: { $first: "$movie.duration" },
                movieGenre: { $first: "$movie.genre" },
                showtimes: {
                    $push: {
                        _id: "$_id",
                        startTime: "$startTime",
                        seatNumbers: "$seatNumbers",
                        availableSeats: "$availableSeats"
                    }
                }
            }
        }
    ]);
    return {
        success:true,
        data: showtimes,
        code:200
    };
  
}

const getDetailShowtimeService = async (showtimeId) => {
    const showtime = await DB_CONNECTION.Showtime.findById(showtimeId).populate([
        { path: "cinema" },
        {path: "movie"},
        {
            path: "room",
            populate: {
                path:"seats"
            }
        },
    ]);

    return {
        success: true,
        message: 'lấy thông tin thành công',
        code: 200,
        data:showtime
    }
}


export {
    createShowtimeService,
    getUpShowtimeByMoiveAndDateService,
    getDetailShowtimeService,
    getUpShowtimeByCinemaAndDateService
 };
