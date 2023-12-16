import {cookies} from "next/headers";
import AuthClient from "@/util/AuthClient";
import {json} from "node:stream/consumers";

async function checkStatus() {

    const access_token = cookies().get("access_token")?.value;
    
    if (!access_token) {
        return false;
    }

    const validateToken = await AuthClient.validateAccessToken(access_token);
    return validateToken
}

export default async function ProtectedRoute() {
    const isTokenValid = await checkStatus();

    if (!isTokenValid) {
        return (<div>
            Please login in.
        </div>)
    }

    return (<div>
        This is a Protected Route.
    </div>)
}
