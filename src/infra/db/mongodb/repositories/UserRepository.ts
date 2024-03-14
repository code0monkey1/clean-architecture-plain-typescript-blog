import { CreateUserRepository } from "../../../../application/interfaces/repositories/authentication/CreateUserRepository";
import { LoadUserByEmailIdRepository } from "../../../../application/interfaces/repositories/authentication/LoadUserByEmailRepository";
import { mapDocument, objectIdToString } from "../helpers/mappers";
import UserModel from "../models/UserModel";

export class UserRepository implements CreateUserRepository, LoadUserByEmailId {
    async loadUserByEmail(
        email: LoadUserByEmailIdRepository.Request,
    ): Promise<LoadUserByEmailIdRepository.Response> {
        const user = await UserModel.findOne({ email });

        return user && mapDocument(user);
    }

    async createUser(
        userData: CreateUserRepository.Request,
    ): Promise<CreateUserRepository.Response> {
        const { _id } = await UserModel.create(userData)!;

        return objectIdToString(_id);
    }
}
