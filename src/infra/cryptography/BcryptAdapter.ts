import { HashComparer } from "../../application/interfaces/cryptography/HashComparer";
import { HashGenerator } from "../../application/interfaces/cryptography/HashGenerator";
import bcrypt from "bcrypt";

export class BcryptAdapter implements HashGenerator, HashComparer {
    constructor(private readonly salt: number) {}
    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.salt || 10);
    }
    compare(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    }
}
