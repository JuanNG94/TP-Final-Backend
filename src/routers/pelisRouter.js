import express from 'express'
import {getPeliById, getPelis, getPelisContent} from "../controllers/pelisController";

export const pelisRoute = express.Router()

pelisRoute.get("/", getPelis)
pelisRoute.get("/:id", getPeliById)
pelisRoute.get( "/content/:id",getPelisContent)