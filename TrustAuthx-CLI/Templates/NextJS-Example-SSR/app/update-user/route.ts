import AuthClient from "@/util/AuthClient";
import { cookies } from "next/headers";


export async function GET(request: Request) {
    const accessToken = cookies().get("access_token")?.value;

    if(!accessToken){
        return Response.redirect("http://127.0.0.1:3535");
    }

    const updateProfile = AuthClient.generateEditUserUrl(accessToken, "http://127.0.0.1:3535/re-auth")



    return Response.redirect(updateProfile)
}
