import { User } from "../../../../domain/entities/User";

export interface LoadUserByEmailIdRepository {
    loadUserByEmail(
        email: LoadUserByEmailIdRepository.Request,
    ): Promise<LoadUserByEmailIdRepository.Response>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoadUserByEmailIdRepository {
    export type Request = string;
    export type Response =
        | (Omit<User, "password"> & { hashedPassword: string })
        | null;
}
