import { BaseController } from "../../../../../infra/http/controllers/BaseController";
import { SignUpController } from "../../../../../infra/http/controllers/authentication/SignUpController";
import { RegisterUserValidator } from "../../../../../infra/http/validators/sign-up/RegisterUserValidator";
import { makeSignIn } from "../../../use-cases/authentication/signInFactor";
import { makeSignUp } from "../../../use-cases/authentication/signUpFactory";

export const makeSignUpController = (): BaseController => {
    const signUpValidation = new RegisterUserValidator();
    const signUpUseCase = makeSignUp();
    const signInUseCase = makeSignIn();
    return new SignUpController(signUpValidation, signUpUseCase, signInUseCase);
};
