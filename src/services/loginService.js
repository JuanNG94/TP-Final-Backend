import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET} from "../core/config.js";


export const loginService = async(email, password) =>{
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
        error.message = "El usuario no se encuentra registrado!"
        throw error
    }

    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("Contraseña incorrecta!");
        error.statusCode = 400;
        error.message = "Contraseña incorrecta!"
        throw error
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

    return { message: "Logged in", token }
}
