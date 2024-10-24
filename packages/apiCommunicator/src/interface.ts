export enum ResponseType{
    ok = 'ok',
    error = 'error',
}

export interface IResponse{
    type: ResponseType;
    authed: boolean;
    errorMessage?: string;
    token: string | null;
}

export interface IRequest{
    apiUrl: string;
    token: string | null;
    setToken: (token: string) => void;
    props: any;
}