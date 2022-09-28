import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";

interface IRequest {
    username: string;
    password: string;
}


class AuthenticateUserService {
    async execute({ username, password }: IRequest) {

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username: username
            }
        })

        if(!userAlreadyExists){
            throw new Error("User or password incorrect.");
        }

        const passwordMatch = compare(password, userAlreadyExists.password);

        if(!passwordMatch){
            throw new Error("User or password incorrect. ");
        }

        const token = sign({}, "6071a8f0-2c3b-4fd5-9562-a6bf678f104e", {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        })


        return { token };

    }
}


export { AuthenticateUserService };