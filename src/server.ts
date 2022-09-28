import "express-async-errors"; // biblioteca para capturar excecoes/erros (pode ser usado o try catch também)

import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: 'Error',
        message: error.message
    })
})


const port = 3000;
app.listen(port, () => console.log(`Backend is running at port ${port}`));