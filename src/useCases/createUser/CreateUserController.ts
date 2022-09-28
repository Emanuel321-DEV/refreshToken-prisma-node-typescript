
import { Response, Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle( request: Request, response: Response ){
        const { name, username, password } = request.body;

        const createUserUseCase = new CreateUserUseCase();

        const createUser = await createUserUseCase.execute( { name, username, password } );

        return response.json(createUser);

    }
}

export { CreateUserController };