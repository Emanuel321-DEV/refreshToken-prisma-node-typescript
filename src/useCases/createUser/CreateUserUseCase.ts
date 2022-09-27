import { client } from "../../prisma/client";
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string;
    username: string;
    password: string;
}

class CreateUserUseCase {
    async execute( { name, username, password } : IUserRequest){
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username: username
            }
        })

        if(userAlreadyExists){
            throw new Error("User with username already exists ");
        }

        // hash(senha, tipoDeSeguranca(salt) )
        const passwordHash = await hash(password, 8);

        const createUser = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash
            }
        })

        return createUser;

    }
}

export { CreateUserUseCase };