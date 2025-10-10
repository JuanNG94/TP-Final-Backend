import express from 'express'
import {changePassword, createUser, deleteUser, getUserById} from '../controllers/userController.js'
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
userRoute.get("/getUserById/:id", verifyTokenMiddleware, getUserById)
userRoute.delete("/deleteUser/:id", verifyTokenMiddleware, deleteUser)
userRoute.patch("/changePassword", verifyTokenMiddleware, changePassword)