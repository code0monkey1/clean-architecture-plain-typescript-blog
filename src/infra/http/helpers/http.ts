import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../interfaces/HttpResponse";

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    body: error,
});

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const serverError = (error?: Error | unknown): HttpResponse<Error> => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError(stack),
    };
};
export const ok = <T = unknown>(body: T): HttpResponse<T> => ({
    statusCode: 200,
    body,
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
    statusCode: 403,
    body: error,
});
