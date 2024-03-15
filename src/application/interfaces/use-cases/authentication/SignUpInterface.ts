import { User } from "../../../../domain/entities/User";
import { EmailInUseError } from "../../../errors/EmailInUseError";
import { UseCase } from "../UseCase";

export interface SignUpInterface
    extends UseCase<SignUpInterface.Request, SignUpInterface.Response> {
    execute(
        request: SignUpInterface.Request,
    ): Promise<SignUpInterface.Response>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignUpInterface {
    export type Request = Pick<
        User,
        "email" | "name" | "password" | "username"
    >;
    export type Response = string | EmailInUseError;
}
