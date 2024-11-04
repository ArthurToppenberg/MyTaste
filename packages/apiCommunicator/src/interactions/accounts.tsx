import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";
import Header from "../components/header";

export interface AccountsGetProps {
    index: number;
    count: number;
}

export interface AccountsProps {
    get?: AccountsGetProps;
}

export interface AccountsResponse extends IResponse {

}

const Accounts = async ({ apiUrl, token, updateToken, props }: IRequest): Promise<AccountsResponse> => {
    const response_failed_connection: AccountsResponse = {
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null
    }

    const response_invalid_token: AccountsResponse = {
        type: ResponseType.error,
        errorMessage: "Invalid token",
        authed: false,
        token: null
    }

    if(!token || token === "" || token === null){
        return response_invalid_token;
    }

    const relativeUrl = "/admin/accounts";
    const absoluteUrl = path.join(apiUrl, relativeUrl);

    const headers = Header({ token: token || "" });
    const response = await axios.post(absoluteUrl, {}, { headers }).catch((error) => {
        if (error.response.status === 404) {
           return response_failed_connection;
        }
        return error.response;
    });

    const tokenReceived: string = response.data.token;
    if (tokenReceived && tokenReceived !== "") {
        updateToken(tokenReceived);
    }

    const accountsResponse: AccountsResponse = response.data;

    return accountsResponse;
}

export default Accounts;