import { EmailInUseError } from "../../../../application/errors/EmailInUseError";
import { SignInInterface } from "../../../../application/interfaces/use-cases/authentication/SignInInterface";
import { SignUpInterface } from "../../../../application/interfaces/use-cases/authentication/SignUpInterface";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";
import { forbidden, ok } from "../../helpers/http";

export class SignUpController extends BaseController {
    constructor(
        private readonly signUpValidation: Validation,
        private readonly signUp: SignUpInterface,
        private readonly signIn: SignInInterface,
    ) {
        super(signUpValidation);
    }

    async execute(
        httpRequest: SignUpController.Request,
    ): Promise<SignUpController.Response> {
        const { name, username, email, password } = httpRequest.body!;
        const idOrError = await this.signUp.execute({
            name,
            username,
            email,
            password,
        });
        if (idOrError instanceof EmailInUseError) {
            return forbidden(idOrError);
        }
        const authenticationTokenOrError = await this.signIn.execute({
            email,
            password,
        });
        if (authenticationTokenOrError instanceof Error) {
            throw authenticationTokenOrError;
        }
        return ok({
            authenticationToken: authenticationTokenOrError,
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignUpController {
    export type Request = HttpRequest<SignUpInterface.Request>;
    export type Response = HttpResponse<
        { authenticationToken: string } | EmailInUseError
    >;
}
