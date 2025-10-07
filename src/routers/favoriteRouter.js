import express from 'express'
import {addPeliToFavorites, deletePeliFromFavorites, getFavoritesByUser} from "../controllers/favoriteController";


export const favRoute = express.Router()

favRoute.post("/addToFav", addPeliToFavorites)
favRoute.get("/:userId", getFavoritesByUser)
favRoute.delete("/:id&&:userId", deletePeliFromFavorites)