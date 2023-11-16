import { sign, verify } from "jsonwebtoken";

import { makeRequest } from "./utils";

interface TokenCheck {
  access: string;
  refresh: string;
  state: boolean;
}

export class AuthLiteClient {
  private secretKey: string;
  private apiKey: string;
  private orgId?: string;
  private signedKey: string;

  constructor(apiKey: string, secretKey: string, orgId?: string) {
    this.secretKey = secretKey;
    this.apiKey = apiKey;
    this.orgId = orgId;
    this.signedKey = this.jwtEncode(secretKey, { api_key: this.apiKey });
  }

  private jwtEncode(key: string, data: object): string {
    return sign(data, key, { algorithm: "HS256" });
  }

  private jwtDecode(token: string, secret: string): any {
    return verify(token, secret, { algorithms: ["HS256"] });
  }

  generateUrl(): string {
    if (this.orgId) {
      return `https://app.trustauthx.com/widget/login/?org_id=${this.orgId} 
              click the above link`;
    } else {
      throw new Error("Must provide org_id");
    }
  }

  async generateEditUserUrl(accessToken: string, url: string): Promise<string> {
    const headers = { accept: "application/json" };
    const params = new URLSearchParams({
      AccessToken: accessToken,
      api_key: this.apiKey,
      signed_key: this.signedKey,
      url: url,
    });

    const apiResult = await makeRequest(
      "https://api.trustauthx.com/api/user/me/settings/?" + params.toString(),
      { headers }
    );
    // return fetch('https://api.trustauthx.com/api/user/me/settings/?' + params.toString(), {
    //     method: 'GET',
    //     headers: headers,
    // }).then((response) => {
    //     return response.url;
    // });
    return apiResult.url!;
    // DONE need to retun the url got from apiResult and also need to give the generics to the makeRequest function
    // DONE fix the return type as well
  }

  async reAuth(code: string): Promise<{ email: string; uid: string }> {
    const url = "https://api.trustauthx.com/api/user/me/widget/re-auth/token";
    const params = new URLSearchParams({
      code: code,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    });
    const headers = { accept: "application/json" };

    try {
      //   const response = await fetch(url + "?" + params.toString(), {
      //     method: "GET",
      //     headers: headers,
      //   });
      const response = await makeRequest(url + "?" + params.toString(), {
        headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        // {
        //     "user": {
        //       "iss": "https://api.trustauthx.com/",
        //       "jti": "a5c65395fd3041cc81900d658d05ef9c",
        //       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiXCJnQUFBQUFCbEN5QXpVU2NGLThBUkJ1ZHF0a0Z5SlBld2hVUnFDVmRyQzNjb3VUOGZhcHNuNTY0VW9jNGVnYnhMd1RnU0RR",
        //       "type": "Bearer",
        //       "exp": 1695443955.56166,
        //       "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiXCJnQUFBQUFCbEN5QXpna1VIYmRxZjVRZFRpa1hKZlZvaTlldUNrQXBsdTlpS0pBTGlyVmFlUGtKSmRUUjRJeE0yQngteXg4TVBaCOrVoJG00sp3uylf8hIKshYyR8",
        //       "refresh_exp": 604800,
        //       "scope": "read",
        //       "img": "https://avatars.githubusercontent.com/u/68702919?v=4",
        //       "name": "moonlightnexus-",
        //       "iat": 1695227955,
        //       "email": "moonlightnexus@yahoo.com",
        //       "uid": "9cfd948699284f5da7b21c2a22df34e0aa441c259e47509b972f8cc6a7f38dcd"
        //     }
        //   }
        // TODO change the below implementation
        // const decodedData = this.jw

        // Object.key(object).length === 0
        // const rtn = this.jwtDecode(this.secretKey, JSON.stringify(data));
        const decodeValue = this.jwtDecode(
          JSON.stringify(data),
          this.secretKey
        );
        // TODO Red swiggly
        const sub = JSON.parse(decodeValue.sub);
        // delete rtn["sub"];
        // rtn["email"] = sub["email"];
        // rtn["uid"] = sub["uid"];
        // return rtn;
        // TODO Red swiggly
        return { email: sub.email, uid: sub.uid };
      } else {
        throw new Error(
          `Request failed with status code: ${
            response.status
          }\n${await response.text()}`
        );
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  async getUser(token: string): Promise<object> {
    const url = "https://api.trustauthx.com/api/user/me/auth/data";
    const params = new URLSearchParams({
      UserToken: token,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    });
    const headers = { accept: "application/json" };

    try {
      const response = await fetch(url + "?" + params.toString(), {
        method: "GET",
        headers: headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        const decodeValue = this.jwtDecode(
          this.secretKey,
          JSON.stringify(data)
        );
        const sub = JSON.parse(decodeValue["sub"]);
        // delete rtn["sub"];
        // rtn["email"] = sub["email"];
        // rtn["uid"] = sub["uid"];
        return { email: sub.email, uid: sub.uid };
      } else {
        throw new Error(
          `Request failed with status code: ${
            response.status
          }\n${await response.text()}`
        );
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<any> {
    const url = "https://api.trustauthx.com/api/user/me/access/token/";
    const params = new URLSearchParams({
      RefreshToken: refreshToken,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    });
    const headers = { accept: "application/json" };

    try {
      const response = await fetch(url + "?" + params.toString(), {
        method: "GET",
        headers: headers,
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error(
          `Request failed with status code: ${
            response.status
          }\n${await response.text()}`
        );
      }
    } catch (error: any) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async validateAccessToken(access_token: string): Promise<boolean> {
    const url = "https://api.trustauthx.com/api/user/me/auth/validate/token";
    const params = new URLSearchParams({
      AccessToken: access_token,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    });
    const headers = { accept: "application/json" };

    try {
      const response = await fetch(url + "?" + params.toString(), {
        method: "GET",
        headers: headers,
      });

      return response.status === 200;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  async revokeToken(
    AccessToken: string | null = null,
    RefreshToken: string | null = null,
    revokeAllTokens: boolean = false
  ): Promise<boolean> {
    const url = "https://api.trustauthx.com/api/user/me/token/";
    const headers = { accept: "application/json" };

    if (!AccessToken && !RefreshToken) {
      throw new Error("Must provide either AccessToken or RefreshToken");
    }

    const tt = !!AccessToken;
    const t = AccessToken ?? RefreshToken;
    const params = new URLSearchParams({
      Token: t!, //Todo can i add ! to t
      api_key: this.apiKey,
      signed_key: this.signedKey,
      AccessToken: tt.toString(),
      SpecificTokenOnly: (!revokeAllTokens).toString(),
    });

    try {
      const response = await fetch(url + "?" + params.toString(), {
        method: "DELETE",
        headers: headers,
      });

      return response.status === 200;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }

  async validateTokenSet(
    access_token: string,
    refresh_token: string
  ): Promise<TokenCheck> {
    try {
      const d: TokenCheck = {
        access: "",
        refresh: "",
        state: false,
      };
      const is_valid = await this.validateAccessToken(access_token);
      if (!is_valid) {
        if (refresh_token) {
          const new_tokens = await this.getAccessTokenFromRefreshToken(
            refresh_token
          );
          d.state = false;
          d.access = new_tokens["access_token"];
          d.refresh = new_tokens["refresh_token"];
        }
        return d;
      } else {
        d.state = true;
        d.access = access_token;
        d.refresh = refresh_token;
        return d;
      }
    } catch (error) {
      throw new Error("Both tokens are invalid, please log in again");
    }
  }
}
