export const oktaConfig = {
    clientId: '0oa8p594syfO8NRy15d7',
    issuer: 'https://dev-68942398.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}