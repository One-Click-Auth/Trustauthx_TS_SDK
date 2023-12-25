# TrustAuthX SDK

The TrustAuthX SDK enables seamless integration with the TrustAuthX authentication service. This TypeScript client, `AuthLiteClient`, simplifies the interaction with TrustAuthX in your projects.

## Installation

```bash
npm install trustauthx-sdk
```

## Usage Example

```typescript
import dotenv from 'dotenv';
import { AuthLiteClient } from 'trustauthx-sdk';

dotenv.config();

// Load your environment variables
const apiKey: string = process.env.API_KEY || '';
const apiSecret: string = process.env.API_SECRET || '';
const orgId: string = process.env.ORG_ID || '';

// Placeholder for the user access token
const userAccessToken: string = 'placeholder-user-access-token';

const test = async () => {
  // Initialize the AuthLiteClient
  const auth = new AuthLiteClient(apiKey, apiSecret, orgId);

  // Get user data using the provided user access token
  const user = await auth.getUser(userAccessToken);

  // Retrieve user information from the user access token
  const userInfo = await auth.getUserFromToken(user.access_token);
  console.log({ user: userInfo });
};

test();
```

Make sure to replace the placeholder for `userAccessToken` with the actual user access token you want to use for testing. Additionally, ensure that your environment variables (`API_KEY`, `API_SECRET`, `ORG_ID`) are properly configured.

### Constructor

```typescript
constructor(apiKey: string, secretKey: string, orgId?: string)
```

- **Description:** Initializes an instance of the `AuthLiteClient` class.
- **Parameters:**
  - `apiKey`: The API key used for authentication.
  - `secretKey`: The secret key used for JWT encoding.
  - `orgId`: (Optional) The organization ID.

### `jwtEncode` Method

```typescript
private jwtEncode(key: string, data: object): string
```

- **Description:** Encodes data into a JSON Web Token (JWT) using the provided key.
- **Parameters:**
  - `key`: The secret key for encoding.
  - `data`: The data to be encoded.
- **Returns:** The encoded JWT.

### `jwtDecode` Method

```typescript
private jwtDecode(token: string): any
```

- **Description:** Decodes a JSON Web Token (JWT).
- **Parameters:**
  - `token`: The JWT to be decoded.
- **Returns:** The decoded data.

### `generateUrl` Method

```typescript
generateUrl(subDomain?: string): string
```

- **Description:** Generates the authentication URL.
- **Parameters:**
  - `subDomain`: (Optional) The subdomain for the URL.
- **Returns:** The generated URL.

### `generateEditUserUrl` Method

```typescript
generateEditUserUrl(accessToken: string, url: string): string
```

- **Description:** Generates the URL for editing user settings.
- **Parameters:**
  - `accessToken`: The user's access token.
  - `url`: The target URL.
- **Returns:** The generated URL.

### `reAuth` Method

```typescript
async reAuth(code: string): Promise<{ email: string; uid: string }>
```

- **Description:** Initiates re-authentication using a code.
- **Parameters:**
  - `code`: The re-authentication code.
- **Returns:** A promise that resolves to an object containing the user's email and UID.

### `getUser` Method

```typescript
async getUser(token: string): Promise<GetUser>
```

- **Description:** Gets user authentication data.
- **Parameters:**
  - `token`: The user's authentication token.
- **Returns:** A promise that resolves to user data.

### `getAccessTokenFromRefreshToken` Method

```typescript
async getAccessTokenFromRefreshToken(refreshToken: string): Promise<any>
```

- **Description:** Retrieves an access token from a refresh token.
- **Parameters:**
  - `refreshToken`: The refresh token.
- **Returns:** A promise that resolves to the new access token.

### `validateAccessToken` Method

```typescript
async validateAccessToken(access_token: string): Promise<boolean>
```

- **Description:** Validates an access token.
- **Parameters:**
  - `access_token`: The access token to validate.
- **Returns:** A promise that resolves to `true` if the token is valid, `false` otherwise.

### `revokeToken` Method

```typescript
async revokeToken(
  accessToken: string,
  refreshToken: string | null = null,
  revokeAllTokens: boolean = false,
): Promise<boolean>
```

- **Description:** Revokes a token.
- **Parameters:**
  - `accessToken`: The access token to revoke.
  - `refreshToken`: (Optional) The refresh token.
  - `revokeAllTokens`: (Optional) Whether to revoke all tokens.
- **Returns:** A promise that resolves to `true` if the token revocation is successful, `false` otherwise.

### `getUserFromToken` Method

```typescript
async getUserFromToken(accessToken: string): Promise<{ uid: string; email: string; img: string }>
```

- **Description:** Gets user data from an access token.
- **Parameters:**
  - `accessToken`: The access token.
- **Returns:** A promise that resolves to an object containing the user's UID, email, and image.

### `validateTokenSet` Method

```typescript
async validateTokenSet(
  access_token: string,
  refresh_token: string,
): Promise<TokenCheck>
```

- **Description:** Validates a pair of access and refresh tokens.
- **Parameters:**
  - `access_token`: The access token to validate.
  - `refresh_token`: The refresh token to validate.
- **Returns:** A promise that resolves to an object containing the validation state and new tokens (if refreshed).

## Support 💬

If you have any questions, feedback, or issues, please feel free to contact us at support@trustauthx.com. We are always happy to hear from you and help you with your integration.

## License 📄

TrustAuthX Python Connector SDK is licensed under the MIT License. See the [LICENSE] file for more details.
