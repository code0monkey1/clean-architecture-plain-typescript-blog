import { User } from "../../../../domain/entities/User";

export interface CreateUserRepository {
    createUser(
        userData: CreateUserRepository.Request,
    ): Promise<CreateUserRepository.Response>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserRepository {
    export type Request = Pick<User, "email" | "name" | "username"> & {
        hashedPassword: string;
    };
    export type Response = string;
}
