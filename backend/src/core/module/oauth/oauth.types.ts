export type OauthFlow = 'standard' | 'pkce' | 'client-credentials';

export type OauthOptions = {
  openidConfigurationUrl: string;
};

export type OpenIdConfiguration = {
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
  userinfo_endpoint: string;
  introspection_endpoint?: string;
};

export type OauthUserInfor = {
  sub: string;
  name: string;
  email: string;
};


export type OauthIntrospectOptions = OauthOptions & {
  clientId: string;
  clientSecret: string;
};


export type OauthJwkOptions = OauthOptions & {
  ttl?: number;
};
