export interface TokenCheck {
  access: string;
  refresh: string;
  state: boolean;
}

export interface GetUser {
  iss: string;
  jti: string;
  access_token: string;
  type: string;
  exp: number;
  refresh_Token: string;
  refreshExp: number;
  scope: string;
  img: string;
  name: string;
  iat: number;
  uid: string;
  email: string;
}
