import { SignUpInterface } from "../../../../application/interfaces/use-cases/authentication/SignUpInterface";
import { SignUp } from "../../../../application/use-cases/SignUp";
import { BcryptAdapter } from "../../../../infra/cryptography/BcryptAdapter";
import { UserRepository } from "../../../../infra/db/mongodb/repositories/UserRepository";
import env from "../../../config/env";

export const makeSignUp = (): SignUpInterface => {
    const userRepository = new UserRepository();
    const bcryptAdapter = new BcryptAdapter(env.bcryptSalt);

    return new SignUp(userRepository, userRepository, bcryptAdapter);
};
