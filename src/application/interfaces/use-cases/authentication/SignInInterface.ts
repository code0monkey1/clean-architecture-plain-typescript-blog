import { User } from "../../../../domain/entities/User";
import { UnauthorizedError } from "../../../errors/UnauthrizedError";
import { UseCase } from "../UseCase";

export interface SignInInterface
    extends UseCase<SignInInterface.Request, SignInInterface.Response> {
    execute(
        credentials: SignInInterface.Request,
    ): Promise<SignInInterface.Response>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignInInterface {
    export type Request = Pick<User, "email" | "password">;
    export type Response = string | UnauthorizedError;
}
