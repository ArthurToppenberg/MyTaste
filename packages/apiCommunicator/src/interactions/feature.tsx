import { IRequest, IResponse, ResponseType } from "../interface";
import axios from "axios";
import path from "path";
import Header from "../components/header";

export interface FeatureCreateProps {
    name: string;
    min: string;
    max: string;
}

export interface FeatureSetProps extends FeatureCreateProps {
    id: number;
}

export interface FeatureProps {
    get?: boolean;
    set?: FeatureSetProps;
    delete?: number;
    create?: FeatureCreateProps;
}

export interface FeatureResponse extends IResponse {
    features: any | null; // Table of features
    feature: any | null; // Single feature
    message?: string;
}

const Feature = async ({ apiUrl, token, updateToken, props }: IRequest): Promise<FeatureResponse> => {
    const response_failed_connection: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Can't connect to the server",
        authed: false,
        token: null,
        features: null,
        feature: null,
    }

    const response_invalid_token: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Invalid token",
        authed: false,
        token: null,
        features: null,
        feature: null,
    }

    const response_no_token_provided: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "No token provided",
        authed: false,
        token: null,
        features: null,
        feature: null,
    }

    if(!token || token === "" || token === null || token === undefined) {
        return response_no_token_provided;
    }

    const relativeUrl = "/admin/feature";
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
        updateToken(tokenRecived);
    }

    const featureResponse: FeatureResponse = response.data;

    return featureResponse;

}

export default Feature;