import { badRequest, serverError } from "../helpers/http";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { Validation } from "../interfaces/Validation";

export abstract class BaseController {
    constructor(private readonly validation?: Validation) {}

    abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest);

            if (error) {
                return badRequest(error);
            }

            return this.execute(httpRequest);
        } catch (e) {
            return serverError(e);
        }
    }
}
