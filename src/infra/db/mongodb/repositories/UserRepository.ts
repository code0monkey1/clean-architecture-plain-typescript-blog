import { CreateUserRepository } from "../../../../application/interfaces/repositories/authentication/CreateUserRepository";
import { LoadUserByEmailIdRepository } from "../../../../application/interfaces/repositories/authentication/LoadUserByEmailRepository";
import { mapDocument, objectIdToString } from "../helpers/mappers";
import UserModel from "../models/UserModel";

export class UserRepository
    implements CreateUserRepository, LoadUserByEmailIdRepository
{
    async loadUserByEmail(
        email: LoadUserByEmailIdRepository.Request,
    ): Promise<LoadUserByEmailIdRepository.Response> {
        const user = await UserModel.findOne({ email });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return user && mapDocument(user);
    }

    async createUser(
        userData: CreateUserRepository.Request,
    ): Promise<CreateUserRepository.Response> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { _id } = await UserModel.create(userData);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return objectIdToString(_id);
    }
}
