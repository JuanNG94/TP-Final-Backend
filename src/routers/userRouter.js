import express from 'express'
import {changePassword, createUser, validate} from '../controllers/userController.js'
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
// userRoute.get("/getUsers", verifyTokenMiddleware, getUsers)
// userRoute.delete("/deleteUser/:id", verifyTokenMiddleware, deleteUser)
userRoute.patch("/changePassword", verifyTokenMiddleware, changePassword)
userRoute.post("/login", validate)