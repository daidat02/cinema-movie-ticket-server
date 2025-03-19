import Cinema from "./Schema/CinemaSchema.js";
import Movie from "./Schema/MoiveSchema.js";
import Room from "./Schema/RoomSchema.js";
import Seat from "./Schema/SeatSchema.js";
import Showtime from "./Schema/ShowtimeSchema.js";
import Ticket from "./Schema/TicketSchema.js";
import User from "./Schema/UserSchema.js";

const DB_CONNECTION = {
    
    Showtime,
    Movie,
    Cinema,
    Room,
    Seat,
    User,
    Ticket
}

export default DB_CONNECTION;