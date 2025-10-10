import {
    addPeliToFavoritesService,
    deletePeliFromFavoritesService,
    getFavoritesService
} from "../services/favoriteService.js";


export const addPeliToFavorites = async (req, res) => {
    try {
        const peli = await addPeliToFavoritesService(req.body)
        res.status(200).json(peli)
    } catch (error) {
        console.log({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const getFavoritesByUser = async (req, res) => {
    try {
        const userId = req.params.id
        const favorites = await getFavoritesService(userId)
        res.status(200).json(favorites)
    } catch (error) {
        console.log({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const deletePeliFromFavorites = async (req, res) => {
    try {
        const peli = await deletePeliFromFavoritesService(req.params.id)
        res.status(200).json(peli)
    } catch (error) {
        console.log({error})
        if(error.statusCode === 204){
            return res.status(204).json([])
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}