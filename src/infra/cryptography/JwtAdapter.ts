/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JwtGenerator } from "../../application/interfaces/cryptography/JwtGenerator";
import { JWTVerifier } from "../../application/interfaces/cryptography/JwtVerifier";
import jwt from "jsonwebtoken";
export class JWTAdapter implements JwtGenerator, JWTVerifier {
    constructor(private readonly secret: string) {}

    async generate(payload: string): Promise<string> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/await-thenable
        return await jwt.sign(payload, this.secret);
    }

    async verify(token: string): Promise<string | null> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/await-thenable
            return (await jwt.verify(token, this.secret)) as string;
        } catch (error) {
            return null;
        }
    }
}
