import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";
import Header from "../components/header";

export interface FeatureProps {

}

export interface FeatureResponse extends IResponse {

}

const Feature = async ({ apiUrl, token, updateToken, props }: IRequest): Promise<FeatureResponse> => {
    const response_failed_connection: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null
    }

    const response_invalid_token: FeatureResponse = {
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

    const tokenRecived: string = response.data.token;
    if (tokenRecived && tokenRecived !== "") {
        updateToken(tokenRecived);
    }

    const featureResponse: FeatureResponse = response.data;

    return featureResponse;

}

export default Feature;