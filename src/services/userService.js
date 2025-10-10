import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {findUserByIdAndCheck} from "../utils/userHelper.js";
import logger from "../core/logger.js";
import {SECRET} from "../core/config.js";
// Creamos el usuario

export const createUserService = async (userData) => {
    logger.info(userData.email)
    const userExists = await User.findOne({ email: userData.email });
    logger.info(userData.email)
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

export const validateUserService = async (email, password) => {
    // Validar que ambos campos existan y sean correctos
    if(!(email && password)){
        const error = new Error("There's a missing field");
        error.statusCode = 400;
        throw error
    }
    // El email es unico y es un identificador de usuario
    const userFound = await User.findOne({email})

    if(!userFound){
        const error = new Error("El usuario no se encuentra registrado!");
        error.statusCode = 400;
        throw error
    }

    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("Contraseña incorrecta!");
        error.statusCode = 400;
        throw error
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

    return { message: "Logged in", token }

}