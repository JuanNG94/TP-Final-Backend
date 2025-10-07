import {
    getPeliByIdService,
    getPeliByNameService,
    getPelisContentService,
    getPelisService
} from "../services/pelisService.js";
import logger from "../core/logger.js";


export const getPelis = async (req, res) => {
    try {
        const { page, limit } = req.query
        const pelis = await getPelisService(page, limit)
        return res.status(200).json(pelis)
    } catch (error) {
        logger.error({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const getPeliByName = async (req, res) => {
    try {
        const peli = await getPeliByNameService(req.body)
        return res.status(200).json(peli)
    } catch (error) {
        logger.error({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// export const getPeliById = async (req, res) => {
//     try {
//         const peli = await getPeliByIdService(req.params.id)
//         return res.status(200).json(peli)
//     } catch (error) {
//         logger.error({error})
//         if(error.statusCode === 204){
//             return res.status(204).json([])
//         }
//         return res.status(500).json({ message: "Internal server error", error: error.message })
//     }
// }

export const getPelisContent = async (req, res) => {
    try {
        const {id} = req.params
        const pelis = await getPelisContentService(id)
        return res.status(200).json(pelis)
    } catch (error) {
        logger.error({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}
