const API_PATH = {
    //auth/
    REGISTER: '/register',
    LOGIN:'/login',
    // movie/
    GET_MOVIE: '/',
    CREATE_MOVIE: '/create',
    UPDATE_MOVIE_FAVOURITE: '/update-movie-favourite/:movieId',
    GET_MOVIES_FAVOURITE:'/add-movie-favourite/',


    //cinema/
    CREATE_CINEMA: '/create',
    GET_CINEMAS: '/',

    //showtimes/
    CREATE_SHOWTIME: '/create',
    GET_SHOWTIMES_BY_MOVIE: '/movie/:movieId/:date',
    GET_SHOWTIMES_BY_CINEMA: '/cinema/:cinemaId/:date',
    GET_DETAIL_SHOWTIME:'/room/:showtimeId',
    
    //room/
    CREATE_ROOM: '/create',
    GET_DETAIL_ROOM: '/:roomId',
    
    // payment/

    BOOK_TICKET:'/book-ticket',
    CREATE_URL_VNP: '/create-url-vnp',
    VNP_RETURN:'/vnp-return',
    // ticket/ 
    GET_TICKETS:'/:userId'
}

const DB_SCHEMA = {
    MOVIE: 'Movie',
}


const CONFIG_VNPAY = {
    tmnCode: process.env.VNP_TMNCODE,
    hashSecret: process.env.VNP_HASHSECRET_KEY,
    url: process.env.VNP_URL,
    returnUrl: process.env.VNP_RETURN_URL,
};

const generateID = (length) => {
    let id = '';

    for (let i = 0; i < length; i++){
        id += Math.floor(Math.random() * 10);
    }
    return id;
}


export { API_PATH, DB_SCHEMA ,generateID,CONFIG_VNPAY};

