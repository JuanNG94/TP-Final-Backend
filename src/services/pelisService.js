import pelisModel from "../models/pelisModel.js";
import logger from "../core/logger.js";
import {API_KEY} from "../core/config.js";


export const getPelisService = async (page = 1, limit = 10) => {
        try {
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10)
            };

            const pelis = await pelisModel.paginate({}, options);
            return pelis;
        } catch (error) {
            throw new Error("Error al obtener las peliculas: " + error.message);
        }
}

export const getPeliByNameService = async (body) => {
    try{
        const {name} = body;

        if (!name) {
            return [];
        }
        const regex = new RegExp(name, 'i');

        const pelis = await pelisModel.find({original_title: { $regex: regex }});
        
        return pelis;
    } catch (error) {
        logger.error(`Error al buscar películas por nombre: ${error.message}`);
        throw new Error("Error al obtener las peliculas: " + error.message);
    }
}


export const getPelisContentService = async (id) => {
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits`);
        const data = await res.json();
        return data
    } catch (error) {
        logger.error(`Error al traer el contenido: ${error.message}`);
        throw new Error("Error al obtener el contenido de las peliculas: " + error.message);
    }
}