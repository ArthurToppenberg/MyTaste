import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";
import Header from "../components/header";

export interface AccountProps {

}

/**
 * @property id: string | null
 * @property email: string | null
 * @property is_client: boolean | null
 * @property is_restaurant: boolean | null
 */
export interface AccountResponse extends IResponse {
    id: number | null;
    email: string | null;
    is_client: boolean | null;
    is_restaurant: boolean | null;
    is_admin: boolean | null;
}

const Account = async ({ apiUrl, token, props }: IRequest): Promise<AccountResponse> => {
    const response_failed_connection: AccountResponse = {
        id: null,
        email: null,
        is_client: null,
        is_restaurant: null,
        is_admin: null,
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null
    }

    const response_invalid_token: AccountResponse = {
        id: null,
        email: null,
        is_client: null,
        is_restaurant: null,
        is_admin: null,
        type: ResponseType.error,
        errorMessage: "Invalid token",
        authed: false,
        token: null
    }

    if(!token || token === "" || token === null){
        return response_invalid_token;
    }

    const relativeUrl = "/account";
    const absolureUrl = path.join(apiUrl, relativeUrl);

    const headers = Header({ token: token || "" });
    const response = await axios.post(absolureUrl, { headers }).catch((error) => {
        if (error.response.status === 404) {
           return response_failed_connection;
        }
        return error.response;
    });

    const accountResponse: AccountResponse = response.data;

    return accountResponse;
}

export default Account;