const API_PATH = {
    //auth/
    REGISTER: '/register',
    LOGIN:'/login',
    // movie/
    GET_MOVIE: '/',
    CREATE_MOVIE: '/create',


    //cinema/
    CREATE_CINEMA: '/create',


    //showtimes/
    CREATE_SHOWTIME: '/create',
    GET_SHOWTIMES_BY_MOVIE: '/movie/:movieId/:date',
    GET_DETAIL_SHOWTIME:'/room/:showtimeId',
    
    //room/
    CREATE_ROOM: '/create',
    GET_DETAIL_ROOM: '/:roomId',
    
    // payment/

    BOOK_TICKET:'/book-ticket',

    // ticket/ 
    GET_TICKETS:'/:userId'
}

const DB_SCHEMA = {
    MOVIE: 'Movie',
}

const generateID = (length) => {
    let id = '';

    for (let i = 0; i < length; i++){
        id += Math.floor(Math.random() * 10);
    }
    return id;
}


export { API_PATH, DB_SCHEMA ,generateID};

