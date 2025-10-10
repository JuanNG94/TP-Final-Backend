import Favorite from "../models/favoritesModel.js";


export const addPeliToFavoritesService = async (peliData) => {
    const {userId, movieId} = peliData

    const favoriteFound = await Favorite.findOne({userId, movieId})

    if(favoriteFound){
        const error = new Error("Pelicula ya agregada a favoritos")
        error.statusCode = 400
        error.message = "Pelicula ya agregada a favoritos"
        throw error
    }

    const favorite = new Favorite({userId, movieId})
    await favorite.save()
    return favorite
}

export const getFavoritesService = async (userId) => {
    const peliculas = await Favorite.find({userId}).populate("movieId").populate("userId")
    return peliculas
}

export const deletePeliFromFavoritesService = async (id) => {
    const favorite = await Favorite.findByIdAndDelete(id)
    return {message: "Pelicula eliminada de favoritos", favorite}
}