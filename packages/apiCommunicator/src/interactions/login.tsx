import { IRequest, IResponse, ResponseType } from "../interface";
import Header from "../components/header";
import axios from "axios";
import path from "path";

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse extends IResponse {

}

const Login = async ({apiUrl, token, setToken, props}: IRequest): Promise<LoginResponse> => {

    const response_failed_connection: LoginResponse = {
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null
    }

    const relativeUrl = "/authentication/login";
    const absolureUrl = path.join(apiUrl, relativeUrl);

    const headers = Header({ token: token || "" });
    const response = await axios.post(absolureUrl, props, { headers }).catch((error) => {
        if (error.response.status === 404) {
            return response_failed_connection;
        }
        return error.response;
    });

    const tokenRecived: string = response.data.token;

    if (tokenRecived && tokenRecived !== "") {
       setToken(tokenRecived);
    }

    const loginResponse: LoginResponse = response.data;

    return loginResponse;
}

export default Login;