import express from 'express'
import { createUser, deleteUser, getUsers, updateUser, validate } from '../controllers/userController.js'
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
userRoute.get("/getUsers", verifyTokenMiddleware, getUsers)
userRoute.delete("/deleteUser/:id", verifyTokenMiddleware, deleteUser)
userRoute.patch("/updateUser/:id", verifyTokenMiddleware, updateUser)
userRoute.post("/login", validate)