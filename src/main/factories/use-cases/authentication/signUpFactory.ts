import { SignUpInterface } from "../../../../application/interfaces/use-cases/authentication/SignUpInterface";
import { BcryptAdapter } from "../../../../infra/cryptography/BcryptAdapter";
import { UserRepository } from "../../../../infra/db/mongodb/repositories/UserRepository";

const makeSignUp = (): SignUpInterface => {
    const userRepository = new UserRepository();
    const bcryptAdapter = new BcryptAdapter();
};
