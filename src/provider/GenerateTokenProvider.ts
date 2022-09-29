import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string){

        const token = sign({}, "6071a8f0-2c3b-4fd5-9562-a6bf678f104e", {
            subject: userId,
            expiresIn: "20s"
        });

        return token;
    }
}


export { GenerateTokenProvider };