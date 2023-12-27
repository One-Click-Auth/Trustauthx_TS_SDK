import dotenv from 'dotenv';
import { AuthLiteClient } from '.';

dotenv.config();

// INFO: Saying Typescript trust me these values won't be undefined.
// MORE: Giving Typescript typesaftey trust
const apiKey: string = process.env.API_KEY!;
const apiSecret: string = process.env.API_SECRET!;
const orgId: string = process.env.ORG_ID!;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiXCJnQUFBQUFCbFhmWklyX0xyMzNCNkxEZXJ1RE1ZTm5WUzNud1pINGh0VWRUMEZ4VkN5WGNISGxTcXRUYlBnVmxKLUVJN3ZpanJrMWJ4OXJIbk1aT01PRFVILW9VdkMyQXYyN2pSZTAyWXNBV1FfOGIta0h4bm9iQVp3UVlFdElFSDQ3R3hVRFhHdnNFNzFaaGtDVmt2bFBmOUh3MU5zdlFyQ1NwQm9PQWlXckZhSm5IX2hFcTRYMU5TdC1uR3FNY01YdW1LUWZBSXpzbS1BajBBT253QmFiSWMyN3JlY3NhVHl0eEJPTmlublpwQ0FOb1dTaVlMY2V5d09EUUxpLW13dW4wYm5pV0pSX1Q2bVFEbkNYOTU2UzFtblRPN3NpYmNxZ1pHdm1JNWlXOVRvRHU1dkg2SXlkNk5OTnZ4QWNxUk5qSnhhRjlDNWE3SmxZVTlLX3Q0T2Z5d0JGQmFIUnk4aFoyNW4tOUlfeW5mUFNncmg0RWpXWFZJcnFzdElwLTBKV0VxOGZDeHl6YmtRVk43bzEzSllGLTdqZmlqWjdpN1dCWC1mMTgxenlITWlSTWFvWHRTeEotTExVRC1vMi1xVDg1QjZEODZubG13UGU2Z0xpLWdVcDZaeDFBZ0preS13UE14a0R6QmVHYXZSek1RREJmNXhLS3pyWnJ2d2R2M3JJbjVTZXNJRC1FYUhmcHBsMVhxNThRMTFPd2doN3YtX1NHbW40bnQ0d1JuenR1MldFV0U2NngxeDBVVktRVGs2b3ZjOWZneEtFU3dKRDBwQXRvSExZb0lkUU1YZThyODdPN0I0WWluaXNPRW53UENPZ2dUa3RLbDFSRHdyUjlkWlNFLTlLTzZXRWIyYnRMaDl2a0JjTVNLLTFZVUZncWEyQ2puN0xvOElXbjl0ZzRxVTAtU3pJaz1cIiJ9.nGgqf4N0B3AmsCUd3bZpiw4ghI3flvUMhv8dtwjIikA';

const test = async () => {
  const auth = new AuthLiteClient(apiKey, apiSecret, orgId);
  const user = await auth.getUser(token);

  const uiol = await auth.getUserFromToken(user.access_token);
  console.log({ user: uiol });
};

test();
