import { User } from "../../../../domain/entities/User";

export interface CreateUserRepository {
    createUser(
        userData: CreateUserRepository.Request,
    ): Promise<CreateUserRepository.Response>;
}

export namespace CreateUserRepository {
    export type Request = Pick<User, "email" | "name" | "username"> & {
        hashedPassword: string;
    };
    export type Response = string;
}
