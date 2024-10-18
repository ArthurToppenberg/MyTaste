export enum ResponseType{
    ok,
    error,
}

export interface IResponse{
    type: ResponseType;
    errorMessage?: string;
}

export interface IRequest{
    apiUrl: string;
    token: string | null;
    props: any;
}