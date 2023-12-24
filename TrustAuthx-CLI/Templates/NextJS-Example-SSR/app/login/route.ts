import AuthClient from "@/util/AuthClient";


export async function GET(request: Request) {

    return Response.redirect(AuthClient.generateUrl());
}
