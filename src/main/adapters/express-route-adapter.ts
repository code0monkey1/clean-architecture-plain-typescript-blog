/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BaseController } from "../../infra/http/controllers/BaseController";
import { HttpRequest } from "../../infra/http/interfaces/HttpRequest";
import { Request, Response } from "express";
import { HttpResponse } from "../../infra/http/interfaces/HttpResponse";
export const expressRouteAdapter =
    (controller: BaseController) => async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            userId: req.userId,
        };
        const httpResponse: HttpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body?.message,
            });
        }
    };
