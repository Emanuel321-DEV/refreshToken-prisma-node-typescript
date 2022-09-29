// Arquivo responsável por verificar se o token existe e se é valido

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";



export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;


    if(!authToken){
        return response.status(401).json({
            message: 'Token is missing',
        })
    }

    // Bearer a73118djdjsdiijdiqjdiqmcmcnvn 
    const [ bearer, token ] = authToken.split(" ");

    try {
        // Verifica se o jwt eh valido: token, hash definidio em sign
        verify(token, '6071a8f0-2c3b-4fd5-9562-a6bf678f104e');

        return next();

    }catch(err){
        return response.status(401).json({
            message: "Token invalid",
        })
    }



}