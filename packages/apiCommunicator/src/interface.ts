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
    loading: boolean;
    apiUrl: string;
    token: string | null;
    updateToken: (token: string) => void;
    props: any;
}