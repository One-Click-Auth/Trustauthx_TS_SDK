import AuthClient from "@/util/AuthClient";
import {cookies} from "next/headers";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);

    // @ts-ignore
    const token : string   = queryParams.get('code');


    try {
        const user: any = await AuthClient.getUser(token);


        cookies().set("access_token", user.access_token, {
             maxAge: 3600 * 24
        });

        return new Response(JSON.stringify(user), {status: 200, headers: {'Content-Type': 'application/json'}});

    } catch (error) {
        try {
            // @ts-ignore
            const {detail} = JSON.parse(error.message.split('\n').pop());

            if (detail === 'Token Expired - token expired') {
                return new Response('Token expired', {status: 401});
            }
        } catch (e) {
            console.log('Error parsing response:', e);
        }

        console.log("LOG:", error);
        return new Response('Internal server error', {status: 500});
    }


}
