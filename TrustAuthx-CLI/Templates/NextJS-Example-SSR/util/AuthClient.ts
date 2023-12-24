import { AuthLiteClient } from "trustauthx";



const apiKey: string = process.env.API_KEY ? process.env.API_KEY : "";
const API_SECRET: string = process.env.API_SECRET ? process.env.API_SECRET : "";
const orgId: string = process.env.ORG_ID ? process.env.ORG_ID : "";

const authClient = new AuthLiteClient(apiKey, API_SECRET, orgId);

export default authClient;