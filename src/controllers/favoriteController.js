import {
    addPeliToFavoritesService,
    deletePeliFromFavoritesService,
    getFavoritesService
} from "../services/favoriteService";


export const addPeliToFavorites = async (req, res) => {
    try {
        const peli = await addPeliToFavoritesService(req.params.id)
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
        const favorites = await getFavoritesService()
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