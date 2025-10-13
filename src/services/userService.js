import User from "../models/userModel.js"
import {findUserByIdAndCheck} from "../utils/userHelper.js";
import logger from "../core/logger.js";
// Creamos el usuario

export const createUserService = async (userData) => {
    const userExists = await User.findOne({ email: userData.email });
    if(userExists){
        const error = new Error("El email ya se encuentra registrado");
        error.statusCode = 400;
        error.message = "El email ya se encuentra registrado"
        throw error;
    }
    // Creamos el user
    const newUser = new User(userData);
    // Save
    logger.info(newUser)
    await newUser.save()
    logger.info("usuario creado")
    return { message: "User created", id: newUser._id }
}

// Obtener todos los usuarios
export const getUserByIdService = async (userId) => {
    const {id} = userId
    const user = await User.findById({ _id: id})
    return user
}

// Borrar el usuario
export const deleteUserService = async (userId) => {
    // Validar
    await findUserByIdAndCheck(userId)

    await User.findByIdAndDelete(userId)
    return { message: "User deleted succesfully" }
}

export const changePasswordService = async (updateData) => {
    const {id, password} = updateData
    await findUserByIdAndCheck(id)
    const updatedUser = await User.findByIdAndUpdate({ _id: id  }, {password: password}, {new: true} )

    return updatedUser;
}