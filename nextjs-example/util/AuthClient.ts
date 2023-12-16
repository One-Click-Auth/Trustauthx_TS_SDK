import { AuthLiteClient } from '../../src';

const apiKey = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const orgId = process.env.ORG_ID;

if (!apiKey || !API_SECRET || !orgId) {
  throw new Error(
    'Required environment variables are not set: API_KEY, API_SECRET, ORG_ID',
  );
}

const authClient = new AuthLiteClient(apiKey, API_SECRET, orgId);

export default authClient;
