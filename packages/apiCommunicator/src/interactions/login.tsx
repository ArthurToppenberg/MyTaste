import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse extends IResponse {
    token: string|null;
}

const Login = async ({apiUrl, token, props}: IRequest): Promise<LoginResponse> => {
    const relativeUrl = "/authentication/login";
    const absolureUrl = path.join(apiUrl, relativeUrl);

    const headers = {
        "Content-Type": "application/json",
        "Token": token,
    };

    const response = await axios.post(absolureUrl, props, { headers }).catch((error) => {
        if (error.response.status === 404) {
            return {
                token: null,
                type: ResponseType.error,
                errorMessage: "Can't connect to the server"
            };
        }
        return error.response;
    });

    const loginResponse: LoginResponse = response.data;

    return loginResponse;
}

export default Login;