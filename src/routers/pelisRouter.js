import express from 'express'
import {getPeliByName, getPelis, getPelisContent} from "../controllers/pelisController.js";

export const pelisRoute = express.Router()

pelisRoute.get("/", getPelis)
// pelisRoute.get("/:id", getPeliById)
pelisRoute.get( "/content/:id",getPelisContent)
pelisRoute.post("/search", getPeliByName)