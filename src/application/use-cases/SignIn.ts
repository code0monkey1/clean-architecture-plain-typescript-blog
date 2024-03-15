import { UnauthorizedError } from "../errors/UnauthrizedError";
import { HashComparer } from "../interfaces/cryptography/HashComparer";
import { JwtGenerator } from "../interfaces/cryptography/JwtGenerator";
import { LoadUserByEmailIdRepository } from "../interfaces/repositories/authentication/LoadUserByEmailRepository";
import { SignInInterface } from "../interfaces/use-cases/authentication/SignInInterface";

export class SignIn implements SignInInterface {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailIdRepository,
        private readonly hashComparer: HashComparer,
        private readonly jwtGenerator: JwtGenerator,
    ) {}

    async execute(
        credentials: SignInInterface.Request,
    ): Promise<SignInInterface.Response> {
        const { email, password } = credentials;
        const user =
            await this.loadUserByEmailRepository.loadUserByEmail(email);
        if (!user) {
            return new UnauthorizedError();
        }
        const isPasswordValid = await this.hashComparer.compare(
            password,
            user.hashedPassword,
        );
        if (!isPasswordValid) {
            return new UnauthorizedError();
        }
        return this.jwtGenerator.generate(user.id);
    }
}
