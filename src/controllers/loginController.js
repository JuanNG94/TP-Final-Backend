import {loginService} from "../services/loginService.js";

export const login = async (req, res) => {
    try {
        // Deberiamos tomar los datos que nos mandan en el req
        const { email, password } = req.body;
        const result = await loginService(email, password)

        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(error.statusCode).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}