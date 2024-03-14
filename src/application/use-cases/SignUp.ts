import { SignUpInterface } from "../interfaces/use-cases/authentication/SignUpInterface";
import { LoadUserByEmailIdRepository } from "../interfaces/repositories/authentication/LoadUserByEmailRepository";
import { CreateUserRepository } from "../interfaces/repositories/authentication/CreateUserRepository";
import { HashGenerator } from "../interfaces/cryptography/HashGenerator";
import { EmailInUseError } from "../errors/EmailInUseError";

export class SignUp implements SignUpInterface {
    constructor(
        private readonly loadUserByEmailIdRepository: LoadUserByEmailIdRepository,
        private readonly createUserRepository: CreateUserRepository,
        private readonly hashGenerator: HashGenerator,
    ) {}
    async execute(
        request: SignUpInterface.Request,
    ): Promise<SignUpInterface.Response> {
        const { email, password } = request;
        const user =
            await this.loadUserByEmailIdRepository.loadUserByEmail(email);

        if (user) return new EmailInUseError();

        const hashedPassword = await this.hashGenerator.hash(password);

        const userData = {
            username: request.username,
            name: request.name,
            email: request.email,
            hashedPassword,
        };
        return this.createUserRepository.createUser(userData);
    }
}
