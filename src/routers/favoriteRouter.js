import express from 'express'
import {addPeliToFavorites, deletePeliFromFavorites, getFavoritesByUser} from "../controllers/favoriteController.js";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware.js";


export const favRoute = express.Router()

favRoute.post("/addToFav", verifyTokenMiddleware, addPeliToFavorites)
favRoute.get("/:id", verifyTokenMiddleware,getFavoritesByUser)
favRoute.delete("/:id", verifyTokenMiddleware,deletePeliFromFavorites) // Id del favorito a borrar