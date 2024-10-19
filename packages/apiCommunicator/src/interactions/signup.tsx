import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";
import Header from "../components/header";

export interface SignupProps {
    email: string;
    password: string;
}

export interface SignupResponse extends IResponse {
    
}

const Signup = async ({apiUrl, token, props}: IRequest): Promise<SignupResponse> => {
    const response_failed_connection: SignupResponse = {
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null
    };

    const relativeUrl = "/authentication/signup";
    const absolureUrl = path.join(apiUrl, relativeUrl);

    const headers = Header({ token: token || "" });
    const response = await axios.post(absolureUrl, props, { headers }).catch((error) => {
        if (error.response.status === 404) {
            return response_failed_connection;
        }
        return error.response;
    });

    const signupResponse: SignupResponse = response.data;

    return signupResponse;
}

export default Signup;