


const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


// Authentication middleware
// This middleware will check access token in authorization headers
// of a request
// It will verify access token against Auth0 JSON wab key set
exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: 'https://dev-92bk1pkm.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://dev-92bk1pkm.eu.auth0.com/api/v2/',
    issuer: 'https://dev-92bk1pkm.eu.auth0.com/',
    algorithms: ['RS256']
});