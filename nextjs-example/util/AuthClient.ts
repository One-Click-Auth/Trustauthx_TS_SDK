import {AuthLiteClient} from "../../src";


// @ts-ignore
const apiKey: string = process.env.API_KEY;
// @ts-ignore
const API_SECRET: string = process.env.API_SECRET;
// @ts-ignore
const orgId: string = process.env.ORG_ID;
const authClient = new AuthLiteClient(apiKey, API_SECRET, orgId);

export default authClient;