import {
    changePasswordService,
    createUserService, deleteUserService, getUserByIdService,
} from "../services/userService.js";
import logger from "../core/logger.js";

export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body)
        return res.status(201).json(response)
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params
        const user = await getUserByIdService(userId)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Borrar el usuario
export const deleteUser = async (req, res) => {
    try {
        // Obtenemos x el path param el id
        // api/user/delete/:id
        const userId = req.params.id
        const result = await deleteUserService(userId)
        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// Actualizamos usuario
export const changePassword = async (req, res) => {
    try {
        const userId = req.body
        logger.info(userId)
        const updatedUser = await changePasswordService(req.body);

        return res.status(201).json(updatedUser)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(404).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}
