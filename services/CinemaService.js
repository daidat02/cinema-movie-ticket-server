import DB_CONNECTION from "../model/DBConnection.js";

const createCinemaService = async (id, name, location) => {
    try {
        const cinema = new DB_CONNECTION.Cinema({ id, name, location });
        await cinema.save();
        return { code: 201, message: 'Cinema created successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCinemasService = async () => { 
    try {
        const cinemas = await DB_CONNECTION.Cinema.find();
        return { code: 200, cinemas };
    } catch (error) {
        throw new Error(error.message);
    }
}

export{createCinemaService,getCinemasService};