export type HttpRequest<
    TBody = unknown,
    TParams = unknown,
    THeaders = unknown,
> = {
    body?: TBody;
    params?: TParams;
    headers?: THeaders;
    userId?: string;
};
